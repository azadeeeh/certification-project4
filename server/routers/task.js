const express = require('express')
const taskRouter = express.Router()

/**
 * Import mongoose models
 */
const TaskList = require('../models/taskListModel')
const Task = require('../models/taskModel')




/**
 * @receives a request to the URL: http://localhost:3001/api/task
 * @returns bulk task list as a JSON
 */
taskRouter.get('/', async (request, response) => {
    const tasks = await Task.find({})
    response.json(tasks)
})


/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/task/:id
 * @returns a specific task
 */
taskRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const task = await Task.findById(id)
    response.json(task)
})


/**
 * @receives a POST request to the URL: http://localhost:3001/api/task/:id
 * Note: The :id required is the id of the taskList the task should belong to
 * @returns the newly created task
 */
taskRouter.post('/:id', async (request, response) => {
    // Get fields
    //const taskId = request.params.id
    const { title, due_date, status, priority } = request.body
    const taskListId = request.params.id;
    // Error handling
    if (!title) {
        return response.status(400).send({
            error: 'missing content in body'
        })
    }
    // Get taskList
    const taskList = await TaskList.findById(taskListId)
    if (!taskList) {
        return response.status(400).send({
            error: 'no such taskList exists to add the task to'
        })
    }
    // Create the task and save it 
    const task = new Task({
        title, due_date, status, priority
    })
    const savedTask = await task.save()
    // Add the task to the taskList, and save that!
    taskList.tasks = taskList.tasks.concat(savedTask._id)
    await taskList.save()
    // Return the saved task
    return response.status(201).json(savedTask)
})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/task/:id
 * Note: The :id required is the id of the task we want to delete
 * You should pass the taskList id in the request body
 * @returns an appropriate status code
 */

taskRouter.delete('/:id', async (request, response) => {

    const taskId = request.params.id;

    // Find the task containing the taskId
    const taskList = await TaskList.findOne({ tasks: taskId });

    if (!taskList) {
        return response.status(400).json({
            error: 'Task list not found'
        });
    }

    // Remove the task from the taskList
    taskList.tasks = taskList.tasks.filter(id => id.toString() !== taskId);
    await taskList.save();

    // Delete the task itself
    await Task.findByIdAndDelete(taskId);

    return response.status(200).json({
        message: 'Task deleted successfully'
    });


});


/** 
taskRouter.delete('/:id', async (request, response) => {
    // Get fields

    const taskId = request.params.id;
    const { taskListId } = request.body;
    console.log(taskId);

    // Check if the tasklist exists
    const taskList = await TaskList.findById(taskListId)
    console.log(taskList);
    if (!taskList) {
        return response.status(400).send({
            error: 'no such taskList exists to remove the task from '
        })
    }
    // Remove the task with mongoose library
    await Task.findByIdAndDelete(taskId)
    // Update the taskList
    taskList.tasks = taskList.tasks.filter(id => id.toJSON() !== taskId)
    await taskList.save()
    // Return response
    response.json({
        message: 'deleted'
    })
})

*/













module.exports = taskRouter