import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => {
  return (await axios.post(baseUrl, credentials)).data
}

const getStoredUser = () => {
  const userJSON = window.localStorage.getItem('loggedUser')

  if (userJSON) {
    return JSON.parse(userJSON)
  }

  return null
}

const setStoredUser = (user) => {
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
}

const removeStoredUser = () => {
  window.localStorage.removeItem('loggedUser')
}

export default { login, getStoredUser, setStoredUser, removeStoredUser }
