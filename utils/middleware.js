const jwt = require('jsonwebtoken')
require('./config')
const UserModel = require('../models/user')

const errorHandler = (error, request, response, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error.name, error.message)
  }

  switch (error.name) {
    case 'CastError':
      return response.status(400).send(error.message)
    case 'ValidationError':
      return response.status(400).json(error.message)
    case 'JsonWebTokenError':
      return response.status(401).json('missing or invalid token')
    case 'InvalidUserError':
      return response.status(404)
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (
    request.method.toUpperCase() !== 'POST' &&
    request.method.toUpperCase() !== 'DELETE'
  ) {
    return next()
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    throw { name: 'JsonWebTokenError' }
  }

  request.user = await UserModel.findById(decodedToken.id)
  if (!request.user) {
    throw { name: 'InvalidUserError' }
  }

  next()
}

const middleware = { errorHandler, tokenExtractor, userExtractor }

module.exports = middleware
