import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button, BlogFormDiv } from './styled'

const BlogForm = ({ toggleVisibility }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const closeForm = () => {
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
    toggleVisibility()
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()

    dispatch(createBlog(user, { blogTitle, blogAuthor, blogUrl }, closeForm))
  }

  return (
    <BlogFormDiv>
      <h2>create new</h2>
      <Form onSubmit={handleCreateBlog}>
        <div>Title:</div>
        <div>
          <input
            type='text'
            name='title'
            value={blogTitle}
            id='blogform-title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>Author:</div>
        <div>
          <input
            type='text'
            name='author'
            value={blogAuthor}
            id='blogform-author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>Url:</div>
        <div>
          <input
            type='text'
            name='url'
            value={blogUrl}
            id='blogform-url'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <Button id='blogform-button'>create</Button>
      </Form>
    </BlogFormDiv>
  )
}

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
}

export default BlogForm
