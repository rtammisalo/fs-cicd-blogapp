const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helpers = require('./test_helpers')

const api = supertest(app)

const addNewUser = async (inputUser, expectedStatus) => {
  await api
    .post('/api/users')
    .send(inputUser)
    .expect(expectedStatus)
    .expect('Content-Type', /application\/json/)

  return await helpers.usersInDb()
}

describe('when there is already a registered user', () => {
  beforeEach(async () => {
    await helpers.insertUsers()
  })

  describe('and adding a new user', () => {
    test('user gets added to database', async () => {
      const user = helpers.unaddedUser
      const users = await addNewUser(user, 201)
      expect(users.map((u) => u.username)).toContain(user.username)
    })

    test('user is not created when username is too small', async () => {
      const user = { ...helpers.unaddedUser, username: 'mc' }

      const response = await api.post('/api/users').send(user).expect(400)

      expect(response.text).toMatch(
        /is shorter than the minimum allowed length/
      )

      const users = await helpers.usersInDb()
      expect(users.map((u) => u.username)).not.toContain(user.username)
    })

    test('user is not created when username is nonexistant', async () => {
      const user = { ...helpers.unaddedUser }
      delete user.username

      const response = await api.post('/api/users').send(user).expect(400)

      expect(response.text).toMatch(/Path `username` is required./)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
