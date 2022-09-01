import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { clearBlogs } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import { Button } from './styled'

const LoginInfo = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    loginService.removeStoredUser()
    dispatch(removeUser())
    dispatch(clearBlogs())
    navigate('/')
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ textAlign: 'start' }}>
      <div style={{ display: 'inline', paddingRight: '5px' }}>
        {user.name} logged in
      </div>
      <div style={{ display: 'inline' }}>
        <Button onClick={logout}>logout</Button>
      </div>
    </div>
  )
}

export default LoginInfo
