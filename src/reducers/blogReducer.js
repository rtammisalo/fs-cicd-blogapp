import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { addBlogToUser, removeBlogFromUser } from './usersReducer'

const initialState = []
initialState.uninitialized = true

const blogSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
      return state
    },
    setBlogs(state, action) {
      return action.payload
    },
    clearBlogs(state) {
      state = []
      return state
    },
    removeBlogById(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
    updateBlog(state, action) {
      return state.map((b) => (b.id === action.payload.id ? action.payload : b))
    },
  },
})

export const { addBlog, setBlogs, clearBlogs, removeBlogById, updateBlog } =
  blogSlice.actions

export const createBlog = (user, blog, closeForm) => {
  return async (dispatch) => {
    try {
      const blogData = {
        title: blog.blogTitle,
        author: blog.blogAuthor,
        url: blog.blogUrl,
      }

      const createdBlog = await blogService.create(user, blogData)

      dispatch(
        setNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`
        )
      )

      createdBlog.user = {
        id: createdBlog.user,
        name: user.name,
        username: user.username,
      }

      closeForm()
      dispatch(addBlog(createdBlog))
      dispatch(addBlogToUser({ createdBlog, user }))
    } catch (error) {
      dispatch(setNotification(error.response.data, true))
    }
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch(setBlogs(blogs))
  }
}

export const removeBlog = (user, blog) => {
  return async (dispatch) => {
    await blogService.remove(user, blog)
    dispatch(removeBlogById(blog.id))
    dispatch(removeBlogFromUser({ blog, user }))
    dispatch(setNotification(`Removed blog ${blog.title} by ${blog.author}`))
  }
}

export const likeBlog = (user, blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(user, {
        ...blog,
        likes: blog.likes + 1,
      })

      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification(`Liked blog ${blog.title} by ${blog.author}`))
    } catch (error) {
      dispatch(
        setNotification(
          `Failed to like blog ${blog.title} by ${blog.author}`,
          true
        )
      )
    }
  }
}

export const addComment = (user, blog, comment) => {
  return async (dispatch) => {
    try {
      const savedComment = await blogService.addComment(user, blog, comment)
      const updatedBlog = {
        ...blog,
        comments: [...blog.comments, savedComment],
      }

      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification(`Added comment ${comment}`))
    } catch (error) {
      dispatch(setNotification(`Failed to add comment ${comment}`, true))
    }
  }
}

export default blogSlice.reducer
