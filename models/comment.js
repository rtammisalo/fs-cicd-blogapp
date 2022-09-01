const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  content: { type: String, required: true },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const CommentModel = mongoose.model('Comment', commentSchema)

module.exports = CommentModel
