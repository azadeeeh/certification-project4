//used Orchard example
const mongoose = require('mongoose')

// Basket schema
const personSchema = new mongoose.Schema({
    name: String,
    passwordHash: String,
    taskLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TaskList'
        }
    ]
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person