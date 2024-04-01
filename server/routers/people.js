const bcrypt = require('bcryptjs');
const express = require('express')
const peopleRouter = express.Router()
/**
 * Import mongoose models
 */
const TaskList = require('../models/taskListModel')
const Task = require('../models/taskModel')
const Person = require('../models/personModel')


/**
 * @receives a GET request to the URL: http://localhost:3001/api/people/about
 * @returns a basic message
 */
peopleRouter.get('/about', async (request, response) => {
    response.json({
        message: 'First endpoint for people router'
    })
})

/**
 * @receives a request to the URL: http://localhost:3001/api/people
 * @returns bulk people list as a JSON
 */
peopleRouter.get('/', async (request, response) => {
    const people = await Person.find({})
    response.json(people)
})

/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/people/:id
 * @returns a specific person  
 */
peopleRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const person = await Person.findById(id)
    response.json(person)
})

/**
 * @receives a POST request to the URL: http://localhost:3001/api/people
 * @returns add the newly created person
 */
peopleRouter.post('/', async (request, response) => {

    // Get fields
    const { name, password } = request.body
    // Error handling
    if (!name || !password) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    //check is there are no duplicates with a built-in fuction
    const duplicateName = await Person.countDocuments({ name }).exec()
    if (duplicateName !== 0) {
        return response.status(400).send({
            error: 'name already exists'
        })
    }
    //perform hash
    const passwordHash = await bcrypt.hash(password, 10)
    //create new user/person
    const person = new Person({
        name, passwordHash
    })
    //updates people and return the new list
    const personResponse = await person.save()
    response.status(201).send(personResponse)

})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/people/:id
 * Note: The :id required is the id of the person we want to delete
 * @returns an appropriate status code
 */

peopleRouter.delete('/:id', async (request, response) => {
    // Get fields
    const personId = request.params.id

    // Get the taskLists we need to remove and remove them
    const taskListIds = (await Person.findById(personId)).taskLists.map(id => id.toJSON())
    // get the tasks to delete
    //get all the basckets that contain the personId which gives us an array of objects
    const taskLists = await Promise.all(taskListIds.map(id => TaskList.findById(taskListIds)))
    //get another array that gives us an array of objects containg tasks from teh above taskLists (array of arrays)
    const tasks = taskLists.map(tasklist => tasklist.tasks)
    //turning the array of arrays into one array and get the id of the tasks and convert them to strings
    const taskIds = tasks.flat().map(id => id.toJSON())
    //perform deletion
    //delete the person
    await Person.findByIdAndDelete(personId)
    //delete the taskLists related to that person
    await Promise.all(taskListIds.map(id => TaskList.findByIdAndDelete(id)))
    //delete the tasls related to that person
    await Promise.all(taskIds.map(id => Task.findByIdAndDelete(id)))
    response.json({
        message: 'deleted'
    })
})

module.exports = peopleRouter