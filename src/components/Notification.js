import React from 'react'
import { useSelector } from 'react-redux'
import { NotificationDiv } from './styled'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = notification.error ? { color: 'red', background: 'pink' } : {}

  return (
    <NotificationDiv
      className='error'
      style={notification.text ? style : { display: 'none' }}
    >
      {notification.text}
    </NotificationDiv>
  )
}

export default Notification
