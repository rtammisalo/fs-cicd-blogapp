import { createSlice } from '@reduxjs/toolkit'

const initialState = { text: null, error: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState
    },
  },
})

export const { changeNotification, clearNotification } =
  notificationSlice.actions

let timerId = null

export const setNotification = (message, error = false) => {
  return async (dispatch) => {
    if (timerId) {
      clearTimeout(timerId)
    }

    dispatch(changeNotification({ text: message, error: error }))
    timerId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
