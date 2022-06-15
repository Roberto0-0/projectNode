const { mongoose } = require('../database/index')

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  publishAt: {
    type: Date,
    default: Date.now
  }
})

const Publication = mongoose.model('Publication', PublicationSchema)

module.exports = { Publication }
