// Task 3.1 — Insert one todo
 db.todos.insertOne({ 
    title: "Buy groceries", 
    priority: "medium", 
    created_at: new Date()
})

// Task 3.2 — Insert many todos at once
 db.todos.insertMany([
    { 
        title: "Watch the movie", 
        priority: "medium", 
        done: false, 
        due_date: ISODate("2026-07-10"), 
        created_at: new Date() 
    }, 
    { 
        title: "Start a new book", 
        priority: "low", 
        done: true, 
        created_at: new Date() 
    }, 
    { 
        title: "Go to the gym", 
        priority: "high", 
        done: false, 
        created_at: new Date() 
    }, 
    { 
        title: "Finish the task", 
        priority: "high", 
        done: true, 
        created_at: new Date() 
    }, 
    { 
        title: "Call a friend", 
        priority: "high", 
        done: false, 
        due_date: ISODate("2026-07-15"), 
        created_at: new Date() 
    }, 
    { 
        title: "Check the shift schedule", 
        priority: "low", 
        done: false, 
        due_date: ISODate("2026-07-15"), 
        created_at: new Date() 
    }
])
// Task 3.3 — Insert a todo with tags
db.todos.insertMany([
   {
         title: "Go to park",
         priority: "low",
         done: false,
         created_at: new Date(),
         tags: ["relax"]
     },
     {
         title: "Finish MongoDB exercises",
         priority: "high",
         done: false,
         created_at: new Date(),
         tags: ["study", "backend", "urgent"]
     },
     {
         title: "Read programming book",
         priority: "medium",
         done: false,
         created_at: new Date(),
         tags: ["learning", "development", "urgent"]
     },
     {
         title: "Clean the room",
         priority: "low",
         done: true,
         created_at: new Date(),
         tags: ["home"]
     }
 ])
// Task 3.4 — Insert with embedded subtasks
db.todos.insertOne(
    { 
        title: "Start coding", 
        done: true, 
        subtasks: [
            { title: "Open laptop", done: true }, 
            { title: "Install MonoDB", done: true }
        ] 
    }
)
db.todos.insertOne(
    { 
        title: "Get ready for an exam", 
        done: true, 
        subtasks: [
            { title: "Practice the questions", done: true }, 
            { title: "Find PDF-formats of books", done: false }
        ] 
    }
)
db.todos.insertOne(
    { 
        title: "Organize a party", 
        done: false, 
        subtasks: [
            { title: "Do shopping", done: false }, 
            { title: "Call the friends", done: false }
        ] 
    }
)
db.todos.insertOne(
    { 
        title: "Write down the lecture", 
        done: true, 
        subtasks: [
            { title: "Watch the youtube video", done: false }, 
            { title: "Buy a new copybook", done: true }
        ] 
    }
)

// Task 3.5 — Test the unique constraint
db.todos.insertOne({title: "Start coding", done: "false"})

/*
MongoServerError: E11000 duplicate key error collection: 
todoapp.todos index: title_1 dup key: { title: "Start coding" } 
*/

// Task 3.6 — Count documents
db.todos.countDocuments()

// Task 4.1 — Find all todos
db.todos.find()
// Task 4.2 — Find by exact match
db.todos.find({done: false})
db.todos.find({priority: "high"})

// Task 4.3 — Multiple conditions
db.todos.find({done: false, priority: "high"})

// Task 4.4 — Comparison operators
db.todos.find({due_date: {$gt: new Date()}})
db.todos.find({priority: { $in: ["medium", "low"]} })

// Task 4.5 — Search with regex
db.todos.find({ title: {$regex: 'start', $options: 'i'} })
// Task 4.6 — Find by array element
db.todos.find({tags: 'urgent'})
 db.todos.find({tags: { $all: ['study', 'backend']}})

// Task 4.7 — Field exists
db.todos.find({due_date: {$exists: true}})
db.todos.find({tags: {$exists: false}})

// Task 4.8 — Sort and limit
db.todos.find().sort({created_at: -1}).limit(3)

// Task 4.9 — Projection
db.todos.find({}, {title: 1, priority: 1, _id: 0})

// Task 4.10 — Pagination
db.todos.find().skip(3).limit(3)

// Task 5.1 — Update one document
db.todos.updateOne({title: 'Watch the movie'}, {$set: {done: true}})

// Task 5.2 — Update many documents
db.todos.updateMany({priority: 'high'}, {$set: {done: true}}).modifiedCount

// Task 5.3 — Add a new field to existing documents
db.todos.updateMany({}, {$set: {updated_at: new Date()}})

// Task 5.4 — Remove a field
db.todos.updateOne({title: 'Watch the movie'}, {$unset: { due_date: ''}})

// Task 5.5 — Add an item to an array
db.todos.updateOne({title: 'Clean the room'}, {$addToSet: { tags: 'important'}})

// Task 5.6 — Remove an item from an array
db.todos.updateMany({}, {$pull: {tags: 'urgent'}})

// Task 5.7 — Increment a number
db.todos.updateMany({}, {$set: {attempts: 0}})
db.todos.updateOne({title: 'Call a friend'}, {$inc: { attempts: 1}})

// Task 5.8 — Upsert
db.todos.updateOne(
    {title: 'Weekly review'}, 
    {$set: { attempts: 1, done: true,tags: ['urgent']} }, {upsert: true}
)
// Task 6.1 — Find todos with at least one subtask
db.todos.find({subtasks: {$exists: true, $not: {$size: 0}}})

// Task 6.2 — Find todos where ALL subtasks are done
db.todos.find({subtasks: {$exists: true}, 'subtasks.done': {$not: {$eq: false}}})

db.todos.find({subtasks: {$exists: true, $not: {$elemMatch: {done: false}}}})

// Task 6.3 — Add a new subtask to a specific todo
db.todos.updateOne(
    {title: 'Start coding'}, 
    {$push: {subtasks: {title: 'Read the task', done: true}}
})

// Task 6.4 — Mark a specific subtask as done
db.todos.updateOne({
    title: 'Start coding', 'subtasks.title': 'Read the task'}, 
    {$set: {'subtasks.$.done': false}}
)

// Task 6.5 — Count todos with more than 2 subtasks
db.todos.countDocuments({'subtasks.2': {$exists: true}})

// Task 7.1 — Delete one todo
db.todos.deleteOne({title: 'Weekly review'})

// Task 7.2 — Delete many todos
db.todos.deleteMany({done: true}).deletedCount

// Task 7.3 — Delete by date range
db.todos.deleteMany({created_at: {$gt: new Date()}})

// Task 7.4 — DON'T delete everything
db.todos.deleteMany({})

//the command deletes immediatly, without asking a comfirmation

// Task 8.1 — Count todos by priority
db.todos.aggregate([{$group: {_id: '$priority', count: {$sum: 1}}}])

// Task 8.2 — Count todos by done status
db.todos.aggregate([{$group: {_id: '$done', count: {$sum: 1}}}])

// Task 8.3 — Tag usage statistics
db.todos.aggregate([{$unwind: '$tags'}, {$group: {_id: '$tags', count: {$sum: 1}}}])

// Task 8.4 — Todos per day
db.todos.aggregate([
        {
            $group: {_id: {
                $dateToString: {
                    format: '%Y-%m-%d', 
                    date: '$created_at'
                }
            }, 
            count: { $sum: 1}
        }
    }
])
// Task 8.5 — Show only titles of unfinished high-priority todos, sorted
db.todos.aggregate([
    {$match: 
        { done: false, priority: 'high'}}, 
        {$project: {_id: 0, title: 1}}, 
        {$sort: {title: 1}}
])

