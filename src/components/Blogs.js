import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BlogEntry } from './styled'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div id='blogs-list'>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogEntry className={'blog-entry'} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </BlogEntry>
        ))}
    </div>
  )
}

export default Blogs
