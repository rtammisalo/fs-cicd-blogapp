import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('addBlog is called with the right argument', async () => {
  const mockAdd = jest.fn()
  const mockNotify = jest.fn()

  mockAdd.mockResolvedValue({
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  })

  const { container } = render(
    <BlogForm addBlog={mockAdd} showNotification={mockNotify} />
  )

  const titleInput = container.querySelector('#blogform-title')
  const authorInput = container.querySelector('#blogform-author')
  const urlInput = container.querySelector('#blogform-url')
  const createButton = screen.getByText('create')

  const event = userEvent.setup()

  await event.type(titleInput, 'React patterns')
  await event.type(authorInput, 'Michael Chan')
  await event.type(urlInput, 'https://reactpatterns.com/')
  await event.click(createButton)

  expect(mockAdd.mock.calls).toHaveLength(1)
  expect(mockAdd.mock.calls[0][0]).toStrictEqual({
    blogTitle: 'React patterns',
    blogAuthor: 'Michael Chan',
    blogUrl: 'https://reactpatterns.com/',
  })
})
