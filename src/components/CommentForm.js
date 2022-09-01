import PropType from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Form, Button } from './styled'

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const saveComment = (event) => {
    event.preventDefault()
    dispatch(addComment(user, blog, comment))
    setComment('')
  }

  return (
    <div>
      <Form onSubmit={saveComment}>
        <input
          type='text'
          name='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        ></input>
        <Button>add comment</Button>
      </Form>
    </div>
  )
}

CommentForm.propTypes = {
  blog: PropType.object,
}

export default CommentForm
