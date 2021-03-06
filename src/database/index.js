const mongoose = require('mongoose')
require('dotenv/config')

mongoose.Promise = global.Promise
mongoose.connect(process.env.URL)

module.exports = { mongoose }
