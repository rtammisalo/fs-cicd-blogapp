import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import { useSelector } from 'react-redux'

const BlogView = () => {
  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  if (!user) {
    return null
  }

  return (
    <div className='tab-view'>
      <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default BlogView
