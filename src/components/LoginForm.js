import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Form, Button, LoginFormDiv } from './styled'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))

    setUsername('')
    setPassword('')
  }

  return (
    <LoginFormDiv style={user ? { display: 'none' } : {}}>
      <h2>log in to application</h2>
      <Form onSubmit={handleLogin}>
        <div>Username:</div>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            id='login-username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>Password:</div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            id='login-password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type='submit' id='login-button'>
          login
        </Button>
      </Form>
    </LoginFormDiv>
  )
}

export default LoginForm
