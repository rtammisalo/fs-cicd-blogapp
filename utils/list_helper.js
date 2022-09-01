const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (!favorite || blog.likes > favorite.likes) {
      return blog
    }
    return favorite
  }, null)
}

const mostBlogs = (blogs) => {
  let result = lodash(blogs)
    .countBy((blog) => blog.author)
    .entries()
    .maxBy((pair) => pair[1])

  return result ? { author: result[0], blogs: result[1] } : undefined
}

const sumLikes = (sum, blog) => sum + blog.likes

const mostLikes = (blogs) => {
  let result = lodash(blogs)
    .groupBy((blog) => blog.author)
    .entries()
    .maxBy((pair) => pair[1].reduce(sumLikes, 0))

  return result
    ? { author: result[0], likes: result[1].reduce(sumLikes, 0) }
    : undefined
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
