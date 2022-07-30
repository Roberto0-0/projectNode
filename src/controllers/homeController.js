const { User } = require('../models/user')
const { Publication } = require('../models/publications')

class HomeController {
  async index(req, res) {
    try {
      const user = await User.find()
      const publication = await Publication.find()

      if (!await user) {
        req.flash('message_error', 'user not found')
        res.redirect('/posts/' + user_id)
      }

      if (!publication) {
        console.log('post not found')
      } else {
        res.render('layout/index.ejs', {
          publication,
          USER: user,
          message_success: req.flash('message_success'),
          message_error: req.flash('message_error')
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = new HomeController()
