import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

const User = () => {
  const selectedUserId = useParams().id
  const users = useSelector((state) => state.users)
  const [selectedUser, setSelectedUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (users.length === 0) {
      return
    }

    const foundUser = users.find((u) => u.id === selectedUserId)

    if (!foundUser) {
      navigate('/users')
    }

    setSelectedUser(foundUser)
  }, [users, selectedUserId, navigate])

  if (!selectedUser) {
    return null
  }

  return (
    <div className='tab-view'>
      <h2>{selectedUser.name}</h2>
      <ul>
        {selectedUser ? (
          selectedUser.blogs.map((b) => (
            <li key={b.id}>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default User
