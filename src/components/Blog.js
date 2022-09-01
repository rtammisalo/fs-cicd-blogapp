import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  removeBlog as removeBlogAction,
  likeBlog as likeBlogAction,
} from '../reducers/blogReducer'
import Comments from './Comments'
import { BlogInfoDiv, Button } from './styled'

const Blog = () => {
  const blogId = useParams().id
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!blogs.uninitialized) {
      let foundBlog = blogs.find((b) => b.id === blogId)

      if (!foundBlog) {
        navigate('/')
      }

      setBlog(foundBlog)
    }
  }, [blogs, navigate, blogId])

  const likeBlog = () => {
    dispatch(likeBlogAction(user, blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlogAction(user, blog))
      navigate('/')
    }
  }

  if (!user || !blog) {
    return null
  }

  return (
    <BlogInfoDiv className='tab-view'>
      <div>
        <h2>{blog.title}</h2>
      </div>
      <div id='blog-likes' className='blog-info'>
        {blog.likes} likes <Button onClick={() => likeBlog(blog)}>like</Button>
      </div>
      <div id='blog-url' className='blog-info'>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div id='blog-creator' className='blog-info'>
        added by {blog.user.name}
        <br />
        {user.username === blog.user.username && (
          <Button
            color={'lightblue'}
            hoverColor={'#daeef5'}
            onClick={() => removeBlog(blog)}
          >
            remove
          </Button>
        )}
      </div>
      <Comments blog={blog} />
    </BlogInfoDiv>
  )
}

export default Blog
