const express = require('express')
const cors = require('cors')
const middleware = require('../utils/middleware')
const gameRouter = require('../controllers/game')
const testRouter = require('../controllers/test')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/', gameRouter)  
app.use('/test', testRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app