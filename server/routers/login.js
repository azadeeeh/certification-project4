const bcrypt = require('bcryptjs');
const express = require('express')
const loginRouter = express.Router()
/**
 * Import mongoose models
 */

const Person = require('../models/personModel')

/**
 * @receives a POST request to the URL: http://localhost:3001/api/login
 * @returns the person that has logged in 
 */

loginRouter.post('/', async (request, response) => {

    // Get fields
    const { name, password } = request.body
    //get user
    const person = await Person.findOne({ name })
    //check is pass is correct
    const passwordCheck = person === null ? false : await bcrypt.compare(password, person.passwordHash)
    // Error handling
    if (!passwordCheck) {
        return response.status(400).send({
            error: 'invalid user or pass'
        })
    }

    response.status(201).send(person)

})



module.exports = loginRouter