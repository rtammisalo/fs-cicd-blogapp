import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  user: { username: 'ukekkonen', name: 'Urho Kekkonen' },
}

let user, mockLike, mockRemove

beforeEach(() => {
  user = { username: 'ukekkonen' }
  mockLike = jest.fn()
  mockRemove = jest.fn()
})

test('does not render additional information at start', async () => {
  render(
    <Blog blog={blog} user={user} likeBlog={mockLike} removeBlog={mockRemove} />
  )

  screen.getByText('Go To Statement Considered Harmful Edsger W. Dijkstra')
})

test('renders additional information after button press', async () => {
  render(
    <Blog blog={blog} user={user} likeBlog={mockLike} removeBlog={mockRemove} />
  )

  const event = userEvent.setup()
  const button = screen.getByText('view')
  await event.click(button)

  screen.getByText('Go To Statement Considered Harmful Edsger W. Dijkstra', {
    exact: false,
  })
  screen.getByText(blog.url, { exact: false })
  screen.getByText(`likes ${blog.likes}`, { exact: false })
  screen.getByText(blog.user.name, { exact: false })
})

test('pressing button twice causes two calls to event handler', async () => {
  render(
    <Blog blog={blog} user={user} likeBlog={mockLike} removeBlog={mockRemove} />
  )

  const event = userEvent.setup()
  const viewButton = screen.getByText('view')
  await event.click(viewButton)
  const likeButton = screen.getByText('like')
  await event.click(likeButton)
  await event.click(likeButton)

  expect(mockLike.mock.calls).toHaveLength(2)
})
