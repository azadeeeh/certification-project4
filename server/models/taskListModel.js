const mongoose = require('mongoose')

// Basket schema
const taskListSchema = new mongoose.Schema({
    name: String,
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
})

taskListSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const TaskList = mongoose.model('TaskList', taskListSchema)

module.exports = TaskList