const mongoose = require('mongoose')

// Task schema
const taskSchema = new mongoose.Schema({
    title: String,
    due_date: String,
    status: String,
    priority: String
})

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task