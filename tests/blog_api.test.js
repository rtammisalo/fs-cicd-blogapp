const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const app = require('../app')
const BlogModel = require('../models/blog')
const UserModel = require('../models/user')
const helpers = require('./test_helpers')

const api = supertest(app)

const addNewBlog = async (inputBlog, token) => {
  if (!token) {
    token = await createToken()
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(inputBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helpers.blogsInDb()

  return blogs
}

const createToken = async (user) => {
  if (!user) {
    user = (await UserModel.find({}))[0]
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.SECRET
  )

  return token
}

describe('when there are blogs in the database', () => {
  beforeEach(async () => {
    await helpers.insertUsers()
    const user = (await UserModel.find({}))[0]
    for (let blog of helpers.initialBlogs) {
      blog.user = user._id
    }
    await BlogModel.deleteMany({})
    await BlogModel.insertMany(helpers.initialBlogs)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helpers.initialBlogs.length)
  })

  test('returned blogs contain a blog in the database', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.map((blog) => blog.title)).toContain('Type wars')
  })

  test('returned blogs have an id field', async () => {
    const blogs = await helpers.blogsInDb()

    expect(blogs[0].id).toBeDefined()
  })

  describe('adding a new blog', () => {
    test('new blog gets added to the database', async () => {
      const blogs = await addNewBlog(helpers.unaddedBlog)

      expect(blogs.map((blog) => blog.title)).toContain('Are ghosts real?')
    })

    test('adds only one blog to the database', async () => {
      const blogs = await addNewBlog(helpers.unaddedBlog)

      expect(blogs).toHaveLength(helpers.initialBlogs.length + 1)
    })

    test('with malformatted data receives response with code 400', async () => {
      const token = await createToken()

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(helpers.malformattedBlog)
        .expect(400)
    })

    test('with no likes-value defaults to zero likes', async () => {
      const blog = { ...helpers.unaddedBlog }
      delete blog.likes
      const blogs = await addNewBlog(blog)

      expect(
        blogs.find((blog) => blog.title === 'Are ghosts real?').likes
      ).toBe(0)
    })

    test('without a token does not add the blog', async () => {
      const response = await api
        .post('/api/blogs')
        .send(helpers.unaddedBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(response.text).toContain('missing or invalid token')

      const blogs = await helpers.blogsInDb()

      expect(blogs.map((b) => b.title)).not.toContain('Are ghosts real?')
    })
  })

  describe('removing a blog', () => {
    test('removes it from the database', async () => {
      const selectedBlog = await BlogModel.findOne({ title: 'React patterns' })
      const token = await createToken()

      await api
        .delete(`/api/blogs/${selectedBlog.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)
      const blogs = await helpers.blogsInDb()

      expect(blogs.map((blog) => blog.title)).not.toContain('React patterns')
    })

    test('with a malformatted id returns code 400', async () => {
      const token = await createToken()

      await api
        .delete('/api/blogs/1')
        .set('Authorization', `bearer ${token}`)
        .expect(400)
    })

    test('with a nonexistant id returns code 404', async () => {
      const unusedId = await helpers.nonExistingId()
      const token = await createToken()

      await api
        .delete(`/api/blogs/${unusedId}`)
        .set('Authorization', `bearer ${token}`)
        .expect(404)
    })

    test('without a token does not delete the blog', async () => {
      const selectedBlog = await BlogModel.findOne({ title: 'React patterns' })

      await api.delete(`/api/blogs/${selectedBlog.id}`).expect(401)
      const blogs = await helpers.blogsInDb()

      expect(blogs.map((blog) => blog.title)).toContain('React patterns')
    })
  })

  describe('updating a blog', () => {
    test('updates the blog in the database', async () => {
      const selectedBlog = await BlogModel.findOne({ title: 'React patterns' })
      selectedBlog.likes = 200

      await api
        .put(`/api/blogs/${selectedBlog.id}`)
        .send(selectedBlog)
        .expect(200)

      const updatedBlog = await BlogModel.findOne({ title: 'React patterns' })

      expect(updatedBlog.likes).toBe(200)
    })

    test('with a malformatted id returns code 400', async () => {
      await api.put('/api/blogs/1').expect(400)
    })

    test('with a nonexistant id returns code 404', async () => {
      const unusedId = await helpers.nonExistingId()
      await api
        .put(`/api/blogs/${unusedId}`)
        .send(helpers.unaddedBlog)
        .expect(404)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
