import PropType from 'prop-types'
import CommentForm from './CommentForm'

const Comments = ({ blog }) => {
  if (!blog) {
    return null
  }

  return (
    <div style={{ paddingBottom: 1 }}>
      <h2>Comments</h2>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

Comments.displayName = 'Comments'

Comments.propTypes = {
  blog: PropType.object,
}

export default Comments
