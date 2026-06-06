-- TASK 1.1
create database bookstore;
-- TASK 1.2
\l
-- TASK 1.3
\c bookstore
-- TASK 1.4
\conninfo

-- TASK 2.1
create user librarian with password 'lib123';
gra
-- TASK 2.2
create user visitor with password 'vis123';
-- TASK 2.3
\du
-- TASK 2.4
create role readers;
-- the difference between CREATE ROLE and CREATE USER is that CREATE ROLE creates a user without login permission
-- TASK 2.5
grant connect on database bookstore to visitor;
-- TASK 2.6
alter user librarian password 'newpass345';
-- TASK 2.7
alter user visitor nologin;
alter user visitor login;

-- TASK 3.1
create table authors (
id serial primary key,
name text not null,
birth_year int check (birth_year between 1000 and 2100),
country text default 'unknown');
-- TASK 3.2
create table books (
id serial primary key,
title text not null,
author_id int not null,
price numeric(10, 2) check (price > 0),
in_stock boolean default true,
published_date date,
created_at timestamptz default now());
-- TASK 3.3
create table customers (
id serial primary key,
full_name text not null,
email text unique not null,
phone text,
registered_at timestamptz default now());
-- TASK 3.4
\dt
\d books

-- TASK 4.1
insert into authors (name, birth_year, country)
values
('Hovhannes Tumanyan', 1869, 'Armenia'),
('William Saroyan', 1908, 'USA'),
('Khachatur Abovyan', 1804, 'Armenia');
-- TASK 4.2
insert into books (title, author_id, price, published_date)
values
('Fairy Tales', 1, 9.99, date '1900-01-01'),
('Selected Tales', 1, 10.99, date '1910-01-01'),
('The Human Comedy', 2, 25.99, date '1943-01-01'),
('My Name Is Aram', 2, 51.99, date '1940-01-01'),
('Wounds of Armenia', 3, 20.99, date '1841-01-01');
-- TASK 4.3
insert into customers (full_name, email)
values
('bob schmidt', 'bob@example.com'),
('jane arthurs', 'jane@example.com'),
('james miller', 'james@example.com');
-- TASK 4.4
insert into books (title, author_id, price, published_date)
values
('Fairy Tales', 1, 0, date '1900-01-01');
-- ERROR:  new row for relation "books" violates check constraint "books_price_check"
-- DETAIL:  Failing row contains (6, Fairy Tales, 1, 0.00, t, 1900-01-01, 2026-06-04 19:48:27.061929+04).
-- TASK 4.5
insert into customers (full_name, email) 
values
('ann miller', 'bob@example.com');
-- ERROR:  duplicate key value violates unique constraint "customers_email_key"
-- DETAIL:  Key (email)=(bob@example.com) already exists.
-- TASK 4.6
-- TASK 4.6.1
select * from books order by price;
select * from books order by price desc;
-- TASK 4.6.2
select * from books where price < 20;
-- TASK 4.6.3
select title, price from books;
-- TASK 4.6.4
select * from authors where country = 'Armenia';
-- TASK 4.6.5
select * from books order by created_at desc limit 3;
-- TASK 4.6.6
select * from books where in_stock = false;

-- TASK 5.1
update books set price = price * 1.10;
-- TASK 5.2
update books set in_stock = false where price > 50;
-- TASK 5.3
update customers set phone = 077565670 where id = 1;
update customers set phone = 099898998 where email = 'jane@example.com';
-- TASK 5.4
delete from books where title like '%Selected%';
-- TASK 5.5
-- using update/delete without where clause, will udpate/delete the whole data

-- TASK 6.1
alter table books add column pages integer;
-- TASK 6.2
alter table customers
add column is_active
boolean default true;
-- TASK 6.3
alter table customers
rename full_name to name;
-- TASK 6.4
alter table books
alter column pages
type smallint;
-- TASK 6.5
alter table books
add constraint pages_positive
check (pages > 0);
-- TASK 6.6
alter table authors
drop column country;

alter table authors
add column country
text default 'Armenia';

-- TASK 7.1
grant select, insert, update, delete
on table books to librarian;
-- TASK 7.2
grant select
on table books
to visitor;
-- TASK 7.3
insert into books
(title, author_id, price, published_date, pages)
values 
('Some Book', 3, 30.99, '2016-01-01', 300);
-- ERROR:  permission denied for table books
-- TASK 7.4
select * from authors;
-- ERROR:  permission denied for table authors
-- cause permission was not granted
-- TASK 7.5
grant readers to visitor;
grant select on all tables in schema public to readers;
-- TASK 7.6
revoke insert on books from librarian;
insert into books
(title, author_id, price, published_date, pages)
values
('Other book', 2, 40.99, '2026-01-01', 299);
-- ERROR:  permission denied for table books

-- TASK 8.1
select books.title, authors.name 
from books inner join authors 
on books.author_id = authors.id;
-- TASK 8.2
select books.* from books
inner join authors
on books.author_id = authors.id
where authors.birth_year > 1900;
-- TASK 8.3
select authors.name, count(*) as book_count
from authors inner join books
on books.author_id = authors.id
group by authors.name;
-- TASK 8.4
select authors.name, count(*) as book_count
from authors inner join books
on authors.id = books.author_id
group by authors.name
having count(*) > 1;

-- TASK 9.1
select usename from
pg_stat_activity
where datname = 'bookstore'
-- TASK 9.2
drop user visitor;
-- ERROR:  role "visitor" cannot be dropped because some objects depend on it
-- DETAIL:  privileges for database bookstore
-- privileges for table books
-- 
-- TASK 9.3
REASSIGN OWNED BY visitor TO postgres;
drop owned by visitor;
-- TASK 9.4
drop table books;
drop table authors;
-- if the id were a foreign key, the order would matter
-- TASK 9.5
\c postgres
drop database bookstore;