import React, { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { restoreLoggedUser } from './reducers/userReducer'
import { Routes, Route, Navigate } from 'react-router-dom'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import loginService from './services/login'
import { getAllUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import NavigationMenu from './components/NavigationMenu'
import { AppName, Page } from './components/styled'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  // Have to use this, or reloads always redirect to root.
  const [storedUser, setStoredUser] = useState(loginService.getStoredUser())

  useEffect(() => {
    dispatch(restoreLoggedUser())
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    setStoredUser(loginService.getStoredUser())
  }, [user])

  const navigateToLogin = () => <Navigate replace to='/login' />

  return (
    <Page>
      <AppName>
        <h1>blogs</h1>
      </AppName>
      <NavigationMenu />
      <Notification />
      <Routes>
        <Route
          path='/login'
          element={!storedUser ? <LoginForm /> : <Navigate replace to='/' />}
        />
        <Route
          path='/users'
          element={storedUser ? <Users /> : navigateToLogin()}
        />
        <Route
          path='/users/:id'
          element={storedUser ? <User /> : navigateToLogin()}
        />
        <Route
          path='/blogs/:id'
          element={storedUser ? <Blog /> : navigateToLogin()}
        />
        <Route
          path='/'
          element={storedUser ? <BlogView /> : navigateToLogin()}
        />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </Page>
  )
}

export default App
