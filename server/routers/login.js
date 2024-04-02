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

    // If the user is not found, return an error
    if (!person) {
        return response.status(400).json({ error: 'Invalid username or password' });
    }

    //check is pass is correct
    const passwordCheck = await bcrypt.compare(password, person.passwordHash)
    // Error handling for pass
    if (!passwordCheck) {
        return response.status(400).json({ error: 'Invalid username or password' });
    }
    const { passwordHash, ...personWithoutPassword } = person.toObject();
    response.status(200).json(personWithoutPassword);

})



module.exports = loginRouter