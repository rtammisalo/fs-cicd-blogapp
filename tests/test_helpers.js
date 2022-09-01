const BlogModel = require('../models/blog')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const initialUsers = [
  {
    username: 'root',
    password: 'alas',
    name: 'pääkäyttäjä',
  },
]

const unaddedUser = {
  username: 'mchan',
  password: 'typo',
  name: 'Michael Chan',
}

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const unaddedBlog = {
  title: 'Are ghosts real?',
  author: 'Charles Mort',
  url: 'http://www.darkcatacomb.com/blog/are_ghosts_real.html',
  likes: 12,
}

const malformattedBlog = {
  author: 'Urho Kekkonen',
  likes: 5,
}

const nonExistingUserId = async () => {
  const user = new UserModel(unaddedUser)
  user.passwordHash = await bcrypt.hash(unaddedUser.password, 10)
  await user.save()
  await user.remove()
  return user._id
}

const nonExistingId = async () => {
  const blog = new BlogModel(unaddedBlog)
  blog.user = await nonExistingUserId()
  await blog.save()
  await blog.remove()
  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await BlogModel.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await UserModel.find({})
  return users.map((u) => u.toJSON())
}

const insertUsers = async () => {
  await UserModel.deleteMany({})

  for (let user of initialUsers) {
    user.passwordHash = await bcrypt.hash(user.password, 10)
  }

  await UserModel.insertMany(initialUsers)
}

module.exports = {
  blogsInDb,
  usersInDb,
  nonExistingId,
  malformattedBlog,
  unaddedBlog,
  initialBlogs,
  initialUsers,
  unaddedUser,
  insertUsers,
}
