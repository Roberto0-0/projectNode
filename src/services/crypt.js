const bcrypt = require('bcryptjs')

const createPasswordHash = async (password) => {
  return bcrypt.hash(password, 10)
}

const comparePasswordHash = async (password, passwordHash) => {
  bcrypt.compare(password, passwordHash, (err, pass) => {
    if (err) {
      return false
    } else {
      return true
    }
  })
}

module.exports = { createPasswordHash, comparePasswordHash }
