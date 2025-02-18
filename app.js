const express = require('express')
const cors = require('cors')
const dbconn = require('./db/dbconn')
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map(route => app.use('/app/v1',require('./routes/' + route)))

//starting express server
const server = () => {
    dbconn()
    app.listen(PORT, () => {
        console.log("You are listening to port:", PORT)
    })
}

server()