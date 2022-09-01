import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropType from 'prop-types'
import { Button } from './styled'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div style={{ margin: 5 }}>
      {!visible && (
        <Button onClick={toggleVisibility}>{props.showLabel}</Button>
      )}
      {visible && (
        <>
          {props.children}
          <Button onClick={toggleVisibility}>{props.hideLabel}</Button>
        </>
      )}
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showLabel: PropType.string.isRequired,
  hideLabel: PropType.string.isRequired,
  children: PropType.node.isRequired,
}

export default Togglable
