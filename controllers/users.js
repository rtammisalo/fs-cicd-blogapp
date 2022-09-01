const bcrypt = require('bcrypt')
const UserModel = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (await UserModel.findOne({ username: username })) {
    throw { name: 'ValidationError', message: 'Username is not unique' }
  }
  if (!password || password.length < 3) {
    throw {
      name: 'ValidationError',
      message: 'Password is too small (less than 3 characters)',
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new UserModel({
    username,
    passwordHash,
    name,
  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await UserModel.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })

  response.json(users)
})

module.exports = usersRouter
