const { User } = require('../models/user')
const { createPasswordHash } = require('../services/crypt')
const bcrypt = require('bcryptjs')

class UserController {
  index(req, res) {
    res.render('user/register/index.ejs', {
      message_success: req.flash('message_success'),
      message_error: req.flash('message_error')
    })
  }

  async create(req, res) {
    const { name, email, password, confirmPassword } = req.body

    try {
      const user = await User.findOne({ email })

      if (await user) {
        req.flash('message_error', 'user already exist')
        res.redirect('/auth/register')

      } else if (await confirmPassword != password) {
        req.flash('message_error', 'different passwords')
        res.redirect('/auth/register')
      } else {
        const newPassword = await createPasswordHash(password)

        await User.create({ name, email, password: newPassword })
        req.flash('message_success', 'user created successfully')
        res.redirect('/auth/login')

      }

    } catch (err) {
      console.error(err)
      req.flash('message_error', 'internal server error')
      res.redirect('/auth/register')
      // res.status(500).send({ message: 'Internal server error' })
    }
  }

  login(req, res) {
    res.render('user/login/index.ejs', {
      message_success: req.flash('message_success'),
      message_error: req.flash('message_error')
    })
  }

  async loginAuthentication(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email }).select('+password')

      if (!await user) {
        req.flash('message_error', 'user not found')
        res.redirect('/auth/login')
      } else {
        if (!await bcrypt.compare(password, user.password)) {
          req.flash('message_error', 'incorrect email or password')
          res.redirect('/auth/login')
        } else {
          res.render('post/homeUser/index.ejs', { data: user })
        }
      }

    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Internal server error' })
    }
  }

  logout(req, res) {
    req.flash('message_success', 'successfully logged out')
    res.redirect('/')
  }
}

module.exports = new UserController()
