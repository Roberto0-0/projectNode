const { User } = require('../models/user')
const { Publication } = require('../models/publications')

class PublicationController {
  index() {
    res.render('publish/index.ejs')
  }

  async show(req, res) {
    const { user_id } = req.params
    const { title, comment } = req.body

    try {
      const user = await User.findById(user_id)
      const publication = await Publication.findOne({ title })

      if (!await user) {
        req.flash('message_error', 'user not found')
        res.redirect('/posts/' + user_id)
      }

      if (await publication) {
        req.flash('message_error', `"${title}" already exist`)
        res.redirect('/posts/' + user_id)
      } else {
        await Publication.create({ title, comment, userId: user_id, userName: user.name })
        req.flash('message_success', `"${title}" published successfully`)
        res.redirect('/posts/' + user_id)
      }

    } catch (err) {
      console.error(err)
      req.flash('message_error', 'internal server error')
      res.redirect('/posts/' + user_id)
    }
  }

  async showIndex(req, res) {
    const { user_id } = req.params

    try {
      const user = await User.findById(user_id)
      const publication = await Publication.find()

      if (!await user) {
        req.flash('message_error', 'user not found')
        res.redirect('/posts/' + user_id)
      }

      if (!publication) {
        console.log('post not found')
      } else {
        res.render('publish/list/index.ejs', {
          publication,
          USER: user
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  async editIndex(req, res) {
    const { user_id, id } = req.params

    try {
      const user = await User.findById(user_id)
      const publication = await Publication.findById(id)

      if (!await user) {
        req.flash('message_error', 'user not found')
        res.redirect('/publications/show/' + user_id)
      }

      if (!await publication) {
        req.flash('message_error', 'publication not found')
        res.redirect('/publications/show/' + user_id)
      } else {
        res.render('publish/edit/index.ejs', {
          USER: user,
          PUBLICATION: publication,
          message_success: req.flash('message_success'),
          message_error: req.flash('message_error')
        })
      }

    } catch (err) {
      console.error(err)
      req.flash('message_error', 'internal server error')
      res.redirect('/publications/show/' + user_id)
    }
  }

  async edit(req, res) {
    const { user_id, id } = req.params
    const { title, comment } = req.body

    try {
      const user = await User.findById(user_id)
      const publication = await Publication.findById(id)

      if (!await user) {
        req.flash('message_error', 'user not found')
        res.redirect('/publications/show/' + user_id)
      }

      if (!await publication) {
        req.flash('message_error', 'publication not found')
        res.redirect('/publications/show/' + user_id)
      } else {
        await publication.updateOne({ title, comment })
        req.flash('message_success', `${publication.title} update successfully`)
        res.redirect('/publications/show/' + user_id)
      }

    } catch (err) {
      console.error(err)
      req.flash('message_error', 'internal server error')
      res.redirect('/publications/show/' + user_id)
    }
  }

  async destroy(req, res) {
    const { user_id, id } = req.params

    try {
      const user = await User.findById(user_id)
      const publication = await Publication.findById(id)

      if (!await user) {
        req.flash('message_error', 'user not found')
        res.redirect('/publications/show/' + user_id)
      }

      if (!await user) {
        req.flash('message_error', 'publication not found')
        res.redirect('/publications/show/' + user_id)
      } else {
        await Publication.deleteOne(publication)
        req.flash('message_success', `${publication.title} deleted successfully`)
        res.redirect('/publications/show/' + user_id)
      }
    } catch (err) {
      console.error(err)
      req.flash('message_error', 'internal server error')
      res.redirect('/publications/show/' + user_id)
    }
  }
}

module.exports = new PublicationController()
