const { mongoose } = require('../database/index')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = { Post }
