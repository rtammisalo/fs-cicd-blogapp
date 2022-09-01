import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginInfo from './LoginInfo'
import { Navigation } from './styled'

const NavigationMenu = () => {
  const user = useSelector((state) => state.user)

  if (!user) {
    return null
  }

  return (
    <Navigation>
      <div className='NavigationTab'>
        <Link to='/blogs'>blogs</Link>
      </div>
      <div className='NavigationTab'>
        <Link to='/users'>users</Link>
      </div>
      <div id='LoginInfo' className='NavigationTab'>
        <LoginInfo />
      </div>
    </Navigation>
  )
}

export default NavigationMenu
