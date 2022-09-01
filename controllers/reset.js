const router = require('express').Router()
const BlogModel = require('../models/blog')
const UserModel = require('../models/user')

router.post('/reset', async (request, response) => {
  await UserModel.deleteMany({})
  await BlogModel.deleteMany({})

  response.status(204).end()
})

module.exports = router
