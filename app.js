const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()
const path = require('node:path')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.get('/version', (_req, res) => {
  res.send('3')
})

if (process.env.NODE_ENV === 'test') {
  console.log('Running in TEST mode')
  const resetRouter = require('./controllers/reset')
  app.use('/api/test', resetRouter)
}

app.use(middleware.errorHandler)

if (config.NODE_ENV !== 'development') {
  app.use(express.static('build'))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
  })
}

module.exports = app
