/**
 * Import environmental variables
 */
require('dotenv').config()

/**
 * Necessary imports for starting a server
 */
const db = require('./config/mongodb')
const express = require('express')
const cors = require('cors')
const app = express()                       // Creates an express server in app

/**
 * Import routers and middleware
 */
const morgan = require('morgan')

const taskRouter = require('./routers/task')
const taskListRouter = require('./routers/taskList')
const peopleRouter = require('./routers/people')
const loginRouter = require('./routers/login')
/**
 * Initial server setup
 * We need to use cors so we can receive requests from localhost
 * We need express.json so we can receive requests with JSON data
 */
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json())
/**
 * Adding middleware and routes
 */
app.use(morgan('dev'))
app.use('/api/task', taskRouter)
app.use('/api/taskList', taskListRouter)
app.use('/api/people', peopleRouter)
app.use('/api/login', loginRouter)


/**
 * Connect to database, start server & listen to server
 */
const server = async () => {
    await db.makeConnection()
    return app.listen(process.env.PORT, () => {
        console.log(`Server running on PORT: ${process.env.PORT}`)
    })
}


module.exports = server() 