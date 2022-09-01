import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from './styled'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div className='tab-view'>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {[...users]
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
