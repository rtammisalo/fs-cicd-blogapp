import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    addBlogToUser(state, action) {
      const blog = action.payload.createdBlog
      const user = action.payload.user
      const listedUser = state.find((u) => u.username === user.username)

      listedUser.blogs.push(blog)
    },
    removeBlogFromUser(state, action) {
      const blog = action.payload.blog
      const user = action.payload.user
      const listedUser = state.find((u) => u.username === user.username)

      listedUser.blogs = listedUser.blogs.filter((b) => b.id !== blog.id)
    },
  },
})

export const { setUsers, addBlogToUser, removeBlogFromUser } =
  usersSlice.actions

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
