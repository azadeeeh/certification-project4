const express = require('express')
const taskListRouter = express.Router()

/**
 * Import mongoose models
 */
const TaskList = require('../models/taskListModel')
const Task = require('../models/taskModel')
const Person = require('../models/personModel')



/**
 * @receives a request to the URL: http://localhost:3001/api/taskList
 * @returns bulk taskLists list as a JSON
 */
taskListRouter.get('/', async (request, response) => {
    const taskList = await TaskList.find({})
    response.json(taskList)
})

/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/taskList/:id
 * @returns a specific taskList 
 */
taskListRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const taskList = await TaskList.findById(id)
    response.json(taskList)
})

/**
 * @receives a POST request to the URL: http://localhost:3001/api/taskList/:id
   Note: The :id required is the id of the person the taskList should belong to
 * @returns the newly created taskList
 */
taskListRouter.post('/:id', async (request, response) => {
    console.log('Received POST request to /api/taskList');
    console.log('Request body:', request.body);

    // Get fields
    const personId = request.params.id
    const { name } = request.body
    // Error handling
    if (!name) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    //get the person
    const person = await Person.findById(personId)
    if (!person) {
        return response.status(400).send({
            error: 'no such person'
        })
    }
    // Create new taskList and save it
    const taskList = new TaskList({
        name
    })
    const savedTaskList = await taskList.save()
    //add the baskcket to the person and save 
    person.taskLists = person.taskLists.concat(savedTaskList._id)
    await person.save()
    // Return the saved taskList
    response.status(201).send(savedTaskList)
})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/taskList/:id
 * Note: The :id required is the id of the taskList we want to delete
 * pass the person id to request body
 * @returns an appropriate status code
 */
taskListRouter.delete('/:id', async (request, response) => {
    // Get fields
    const taskListId = request.params.id
    const { personId } = request.body
    //get the person
    const person = await Person.findById(personId)
    if (!person) {
        return response.status(400).send({
            error: 'no such person'
        })
    }

    //remove the taskLists and tasks from the person that owns it 
    person.taskLists = person.taskLists.filter(id => id.toJSON() !== taskListId)
    await person.save()

    // Get the tasks we need to remove and remove them
    const taskIds = (await TaskList.findById(taskListId)).tasks.map(id => id.toJSON())
    await Promise.all(taskIds.map(id => Task.findByIdAndDelete(id)))
    // Remove the taskList
    await TaskList.findByIdAndDelete(taskListId)
    // Return response
    response.json({
        message: 'deleted'
    })
})


module.exports = taskListRouter