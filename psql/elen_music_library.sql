-- Task 1.1
-- users, artists, albums, songs, user_listened_songs

-- Task 1.2
/** 
users ->
id serial primary key,
username varchar(100) not null unique,
email text unique not null,
password text not null,
created_at timestamptz default now(),
updated_at timestamptz default now()

artists -> 
id serial primary key,
full_name varchar(100) not null,
country varchar(100) not null

albums ->
id serial primary key,
album_name text not null,
released_at date not null,
owner integer references artists(id)

songs -> 
id serial primary key,
song_name text not null,
length numeric(10, 2) check(length > 0),
genre varchar(100) not null,
album integer references albums(id)

user_listened_songs ->
user_id integer references users(id),
song_id integer references songs(id),
listened_at timestamptz default now()

**/

-- Task 1.3
-- albums(many) -> artists(one)
-- songs(many) -> albums(one)
-- users(many) <-> songs(many)

-- Task 2.1
create database music_library;
\c music_library
-- Task 2.2
create table users (
id serial primary key,
username varchar(100) not null unique,
email text unique not null,
password text not null,
created_at timestamptz default now(),
updated_at timestamptz default now()
);

create table artists (
id serial primary key,
full_name varchar(100) not null,
country varchar(100) not null
);

create table albums (
id serial primary key,
album_name text not null,
released_at date not null,
owner integer references artists(id)
);

create table songs (
id serial primary key,
song_name text not null,
length numeric(10, 2) check(length > 0),
genre varchar(100) not null,
album integer references albums(id)
);

create table user_listened_songs (
user_id integer references users(id),
song_id integer references songs(id),
listened_at timestamptz default now()
);

-- Task 2.3
\dt

\d users

\d artists

\d albums

\d songs

\d user_listened_songs

alter table users
add column password text not null;

-- Task 2.4

alter table artists
add column biography text;

alter table artists
rename column biography to new_biography;

alter table artists
drop column new_biography;

-- Task 3.1
insert into artists (full_name, country)
values
('Adele', 'UK'),
('Shakira', 'Columbia'),
('Charles Aznavour', 'France'),
('Selena Gomez', 'USA'),
('Beyonce', 'USA');

-- Task 3.2
insert into albums(album_name, released_at, owner)
values
('Begin Again Sessions', '2009-06-01', 1),
('Live at London', '2012-09-10', 1),
('Echoes', '2018-03-15', 1),
('La Bohème', '1965-01-01', 3),
('Stars Dance', '2013-07-19', 4),
('Revival', '2015-10-09', 4),
('Dangerously in Love', '2003-06-24', 5),
('Lemonade', '2016-04-23', 5);

-- Task 3.3
insert into songs (song_name, album, length, genre)
values 
('First Light', 1, 210, 'Pop'),
('City Echoes', 1, 195, 'Jazz'),
('Broken Glass', 1, 240, 'Pop'),
('Live Forever', 2, 300, 'Pop'),
('Rolling Tide', 2, 275, 'Rock'),
('Midnight Voice', 2, 260, 'Soul'),
('Echoes', 3, 230, 'Pop'),
('Silent Roads', 3, 250, 'Electronic'),
('Falling Sky', 3, 245, 'Pop'),
('La Bohème', 4, 260, 'Chanson'),
('Paris Nights', 4, 220, 'Jazz'),
('Old Memories', 4, 240, 'Jazz'),
('Come & Get It', 5, 230, 'Pop'),
('Slow Down', 5, 210, 'Electronic'),
('Stars Dance', 5, 200, 'Pop'),
('Good For You', 6, 240, 'Pop'),
('Same Old Love', 6, 235, 'Pop'),
('Revival', 6, 250, 'R&B'),
('Crazy In Love', 7, 235, 'R&B'),
('Baby Boy', 7, 240, 'R&B'),
('Formation', 8, 230, 'Hip-Hop'),
('Hold Up', 8, 210, 'Pop');

-- Task 3.4
insert into users (username, email, password)
values
('bob', 'bob@gmail.com', 'pass123'),
('james', 'james@gmail.con', 'pass456'),
('Jane', 'jane@gmail.com', 'pass789'),
('ann', 'ann@gmail.com', 'pass012');

-- Task 3.5
insert into user_listened_songs (user_id, song_id, listened_at)
values
(1, 5, '10.09.2025'),
(2, 6, '10.06.2026'),
(3, 1, '01.06.2026'),
(4, 22, '10.06.2026'),
(4, 22, '10.06.2026'),
(1, 20, '01.06.2026'),
(2, 2, '10.06.2025'),
(4, 7, '10.04.2026'),
(4, 8, '10.03.2026'),
(4, 9, '10.01.2026'),
(1, 10, '10.06.2024'),
(2, 11, '10.04.2026'),
(3, 12, '12.05.2026'),
(1, 13, '10.06.2025'),
(2, 14, '08.06.2026'),
(2, 15, '12.17.2025'),
(1, 18, '12.12.2025');
(1, 16, '10.06.2026'),
(1, 17, '10.06.2026'),
(2, 18, '03.05.2026'),
(3, 21, '10.06.2025');
(1, 5, '10.09.2025'),
(2, 6, '10.06.2026'),
(3, 1, '01.06.2026'),
(4, 22, '10.06.2026'),
(4, 22, '10.06.2026'),
(1, 20, '01.06.2026');

-- Task 3.6
insert into songs (song_name, length, genre, album)
values
('some name', -30, 'pop', 1);

-- new row for relation "songs" violates check constraint "songs_length_check"
-- DETAIL:  Failing row contains (23, some name, -30, pop, 1).

insert into albums (album_name, released_at, owner)
values ('some name', '05.10.2025', 56);

-- ERROR:  insert or update on table "albums" violates foreign key constraint "albums_owner_fkey"
-- DETAIL:  Key (owner)=(56) is not present in table "artists".

insert into users (username, password, email)
values ('some name', 'pass', 'bob@gmail.com');

-- ERROR:  duplicate key value violates unique constraint "users_email_key"
-- DETAIL:  Key (email)=(bob@gmail.com) already exists.

-- Task 4.1
select * from artists order by full_name

-- Task 4.2
select * from songs where length > 240 order by length desc;

-- Task 4.3
select * from albums where released_at between '2010-01-01' and '2020-01-01';

-- Task 4.4
select * from songs where song_name ilike '%same%';

-- Task 4.5
select * from songs order by id desc limit 5;

-- Task 4.6
select distinct genre from songs;

-- Task 4.7
select * from user_listened_songs 
where listened_at > now() - interval '7 days';

-- Task 5.1
select count(*) from songs;

-- Task 5.2
select avg(length) from songs;
select round(avg(length)) from songs;

-- Task 5.3
(select song_name, length from songs
order by length asc limit 1)
union
(select song_name, length from songs
order by length desc limit 1);


select 'shortest' as type, song_name, length
from songs where
length = (select min(length) from songs)
union
select 'longest' as type, song_name, length
from songs where
length = (select max(length) from songs);

-- Task 5.4
album as album_id, count(*) as album_count 
from songs group by (album);

-- Task 5.5
select genre, count(*) as songs_count
from songs group by(genre) order by(count(*)) desc;

-- Task 5.6
select genre, round(avg(length)) as average_song_length
from songs group by(genre);

-- Task 5.7
select genre, count(*) from songs
group by(genre) having(count(*) > 3);

-- Task 5.8
-- extrct takes the parts(e.g. year) from date
-- ::int casts the value to integer

select (extract(year from released_at)::int / 10) * 10 as decade,
count(*) as album_count from albums
group by((extract(year from released_at)::int / 10) * 10);

-- Task 5.9
select user_id, count(*) as listened_songs_count
from user_listened_songs group by (user_id) order by user_id;

-- Task 5.10
select song_id, count(*) from user_listened_songs
group by (song_id) 
order by (count(*)) desc
limit 1;

-- Task 6.1
select song_name, album_name from songs
inner join albums on songs.album = albums.id;

-- Task 6.2
select songs.song_name, albums.album_name, artists.full_name
from songs 
inner join albums on songs.album = albums.id
inner join artists on albums.owner = artists.id;

-- Task 6.3
select artists.full_name, count(albums.id)
from artists left join albums
on artists.id = albums.owner
group by artists.full_name;

-- Task 6.4
select artists.full_name, count(albums.id)
from artists left join albums
on artists.id = albums.owner
group by artists.full_name
having count(albums.id) = 0;

-- Task 6.5
select artists.full_name, count(songs.id)
from artists inner join albums
on artists.id = albums.owner  
inner join songs
on albums.id = songs.album
group by artists.full_name;

-- Task 6.6
select artists.full_name, sum(songs.length) / 60
from artists 
inner join albums
on artists.id = albums.owner
inner join songs
on albums.id = songs.album
group by artists.full_name;

-- Task 6.7
select users.username, count(user_listened_songs.user_id)
from users inner join user_listened_songs
on users.id = user_listened_songs.user_id
group by users.username;

-- Task 6.8
select users.username, songs.genre, count(user_listened_songs.song_id)
from users inner join user_listened_songs
on users.id = user_listened_songs.user_id
inner join songs
on user_listened_songs.song_id = songs.id
where users.username = 'bob'
group by users.username, songs.genre
order by count(user_listened_songs.song_id) desc;

-- Task 6.9
select songs.song_name as song_name, 
count(user_listened_songs.song_id) as listening_count
from songs inner join user_listened_songs
on songs.id = user_listened_songs.song_id
group by song_name
order by listening_count desc
limit 5;

-- Task 6.10
select users.username, sum(songs.length) as total_length
from users 
inner join user_listened_songs
on users.id = user_listened_songs.user_id
inner join songs
on user_listened_songs.song_id = songs.id
group by users.username
order by total_length desc
limit 3;

-- Task 7.1
delete from artists where id = 1;
-- update or delete on table "artists" violates foreign key constraint "albums_owner_fkey" on table "albums"
-- DETAIL:  Key (id)=(1) is still referenced from table "albums".

-- Task 7.2
alter table albums
drop constraint albums_owner_fkey;

alter table albums
add constraint albums_owner_fkey
foreign key (owner)
references artists(id)
on delete cascade;

-- ERROR:  update or delete on table "artists" violates foreign key constraint "albums_owner_fkey" on table "albums"
-- DETAIL:  Key (id)=(1) is still referenced from table "albums".

delete from artists where id = 1;

-- ERROR:  update or delete on table "albums" violates foreign key constraint "songs_album_fkey" on table "songs"
-- DETAIL:  Key (id)=(1) is still referenced from table "songs".

-- all the connected foreign keys must be declared with on cascade delete in order to delete them

alter table songs 
drop constraint songs_album_fkey;

alter table songs 
add constraint songs_album_fkey 
foreign key (album)
references albums(id)
on delete cascade;

\d user_listened_songs

alter table user_listened_songs
drop constraint user_listened_songs_song_id_fkey;

alter table user_listened_songs
drop constraint user_listened_songs_user_id_fkey;

alter table user_listened_songs
add constraint user_listened_songs_user_id_fkey
foreign key (user_id)
references users(id)
on delete cascade;

alter table user_listened_songs
add constraint user_listened_songs_song_id_fkey
foreign key (song_id)
references songs(id)
on delete cascade;

delete from artists where id = 1;

--DELETE 1 // deletion was successful

-- Task 7.3

alter table albums
drop constraint albums_owner_fkey;

alter table albums
add constraint albums_owner_fkey
foreign key (owner)
references artists(id)

alter table songs 
drop constraint songs_album_fkey;

alter table songs 
add constraint songs_album_fkey 
foreign key (album)
references albums(id)

alter table user_listened_songs
drop constraint user_listened_songs_song_id_fkey;

alter table user_listened_songs
drop constraint user_listened_songs_user_id_fkey;

alter table user_listened_songs
add constraint user_listened_songs_user_id_fkey
foreign key (user_id)
references users(id)

alter table user_listened_songs
add constraint user_listened_songs_song_id_fkey
foreign key (song_id)
references songs(id)
on delete cascade;

delete from artists where id = 1;

-- update or delete on table "artists" violates foreign key constraint "albums_owner_fkey" on table "albums"
-- DETAIL:  Key (id)=(4) is still referenced from table "albums".

-- Task 8.1
drop table user_listened_songs;
drop table songs;
drop table albums;
drop table artists;
drop table users;

-- Task 8.2
\c postgres
drop database music_library;

