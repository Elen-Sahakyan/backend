// Task 1.1 — Create the database
use todoapp

// Task 1.2 — Create an application user
db.createUser({ 
    user: "todo_app", 
    pwd: "elen123", 
    roles: [ 
        { 
            role: "readWrite", 
            db: "todoapp" 
        }
    ] 
})

// Task 1.3 — Create a read-only user
db.createUser({ 
    user: "todo_viewer", 
    pwd: "viewer123", 
    roles: [ 
        { 
            role: "read", 
            db: "todoapp" 
        } 
    ] 
});

// Task 1.4 — Verify your users
show users
db.getUsers()
/*
{
  users: [
    {
      _id: 'todoapp.todo_app',
      userId: UUID('7070c8f4-df09-4aac-ae73-e8ca963c7414'),
      user: 'todo_app',
      db: 'todoapp',
      roles: [ { role: 'readWrite', db: 'todoapp' } ],
      mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
    },
    {
      _id: 'todoapp.todo_viewer',
      userId: UUID('606a9189-7c69-499b-a397-a23227f0996c'),
      user: 'todo_viewer',
      db: 'todoapp',
      roles: [ { role: 'read', db: 'todoapp' } ],
      mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
    }
  ],
  ok: 1
}
*/

// Task 1.5 — Test the connection
exit
mongosh "mongodb://todo_app:elen123@localhost:27017/todoapp"

db.tasks.insertOne({title: "task1"})
/* {
  acknowledged: true,
  insertedId: ObjectId('6a4d2aff6b577aae97ee0d1e')
} */

db.tasks.find()
// [ { _id: ObjectId('6a4d2aff6b577aae97ee0d1e'), title: 'task1' } ]

exit
mongosh "mongodb://todo_viewer:viewer123@localhost:27017/todoapp"

db.tasks.find()
// [ { _id: ObjectId('6a4d2aff6b577aae97ee0d1e'), title: 'task1' } ]

db.tasks.insertOne({title: "task4"})

// MongoServerError[Unauthorized]: 
// not authorized on todoapp to execute command 


// Task 2.1 — Create the todos collection
db.createCollection("todos")

// Task 2.2 — Add an index
db.todos.createIndex( {title: 1}, {unique: true})

// Task 2.3 — Add a compound index
db.todos.createIndex( {done: 1, priority: 1})

// Task 2.4 — List all indexes
db.todos.getIndexes()

// Task 9.1 — Reconnect as todo_viewer
exit
mongosh "mongodb://todo_viewer:viewer123@localhost:27017/todoapp"

db.todos.find()
db.todos.insertOne({title: 'new Task', done: false})
// MongoServerError[Unauthorized]: 
// not authorized on todoapp to execute command 

db.todos.deleteOne({title: 'Go to park'})
// MongoServerError[Unauthorized]: 
// not authorized on todoapp to execute command

