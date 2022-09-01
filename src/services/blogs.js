import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = (user) => `bearer ${user.token}`

const getTokenConfig = (user) => {
  return {
    headers: { Authorization: getToken(user) },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (user, newBlog) => {
  const config = getTokenConfig(user)

  return axios
    .post(`${baseUrl}`, newBlog, config)
    .then((response) => response.data)
}

const update = (user, blog) => {
  const config = getTokenConfig(user)

  return axios
    .put(
      `${baseUrl}/${blog.id}`,
      { ...blog, user: blog.user.id, comments: blog.comments.map((c) => c.id) },
      config
    )
    .then((response) => response.data)
}

const remove = (user, blog) => {
  const config = getTokenConfig(user)

  return axios.delete(`${baseUrl}/${blog.id}`, config)
}

const addComment = (user, blog, comment) => {
  const config = getTokenConfig(user)
  const commentObj = { content: comment }

  return axios
    .post(`${baseUrl}/${blog.id}/comments`, commentObj, config)
    .then((response) => response.data)
}

export default { getAll, create, update, remove, addComment }
