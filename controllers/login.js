const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await UserModel.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return response.status(401).json('invalid username or password')
  }

  const tokenData = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(tokenData, process.env.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
