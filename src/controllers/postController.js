const { Router } = require('express')
const { User } = require('../models/user')
const { Post } = require('../models/post')

const router = Router()

router.get('/posts/:user_id', async (req, res) => {
  const { user_id } = req.params

  try {
    const user = await User.findById(user_id)

    if (!await user) {
      req.flash('message_error', 'user not found')
      res.redirect('/posts/' + user_id)
    } else {
      const post = await Post.find({ userId: user_id })
      res.render('post/list/index.ejs', {
        USER: user, POST: post,
        message_success: req.flash('message_success'),
        message_error: req.flash('message_error')
      })
    }

  } catch (err) {
    console.error(err)
    req.flash('message_error', 'internal server error')
    res.redirect('/posts/' + user_id)
  }
})

router.get('/post/create/:user_id', async (req, res) => {
  const { user_id } = req.params

  try {
    const user = await User.findById(user_id)

    if (!await user) {
      res.status(404).send({ message: 'User not found' })
    } else {
      res.render('post/create/index.ejs', {
        USER: user,
        message_success: req.flash('message_success'),
        message_error: req.flash('message_error')
      })

    }
  } catch (err) {
    console.error(err)
  }
})

router.post('/posts/create/:user_id', async (req, res) => {
  const { user_id } = req.params
  const { title, comment } = req.body

  try {
    const user = await User.findById(user_id)
    const post = await Post.findOne({ title })

    if (!await user) {
      req.flash('message_error', 'user not found')
      res.redirect('/posts/' + user_id)
    }

    if (await post) {
      req.flash('message_error', `"${title}" already exist`)
      res.redirect('/post/create/' + user_id)
    } else {
      await Post.create({ title, comment, userId: user_id })
      req.flash('message_success', `"${title}" created successfully`)
      res.redirect('/posts/' + user_id)
    }

  } catch (err) {
    console.error(err)
    req.flash('message_error', 'Internal server error')
    res.redirect('/posts/' + user_id)
  }
})

router.get('/posts/edit/:user_id/post/:id', async (req, res) => {
  const { user_id, id } = req.params

  try {
    const user = await User.findById(user_id)
    const post = await Post.findById(id)

    if (!await user) {
      req.flash('message_error', 'user not found')
      res.redirect('/posts/' + user_id)
    }

    if (!await post) {
      req.flash('message_error', 'post not found')
      res.redirect('/posts/' + user_id)
    } else {
      res.render('post/edit/index.ejs', {
        USER: user, POST: post,
        message_success: req.flash('message_success'),
        message_error: req.flash('message_error')
      })
    }
  } catch (err) {
    console.error(err)
  }
})

router.post('/posts/edit/:user_id/post/:id', async (req, res) => {
  const { user_id, id } = req.params
  const { title, comment } = req.body

  try {
    const user = await User.findById(user_id)
    const post = await Post.findOne({ id, title })

    if (!await user) {
      return res.status(404).send({ message: 'user not found' })
    }

    if (!await post) {
      return res.status(404).send({ message: 'post not found' })
    }

    if (await post) {
      req.flash('message_error', `"${post.title}" already exist`)
      res.redirect('/post/create/' + user_id)
    }

    else {
      await post.updateOne({ title, comment })
      req.flash('message_success', `"${post.title}" update successfully`)
      res.redirect('/posts/' + user_id)
    }

  } catch (err) {
    console.error(err)
    req.flash('message_error', 'internal server error')
    res.redirect('/posts/' + user_id)
  }
})

router.get('/posts/delete/:user_id/post/:id', async (req, res) => {
  const { user_id, id } = req.params

  try {
    const user = await User.findById(user_id)
    const post = await Post.findById(id)

    if (!await user) {
      req.flash('message_error', 'user not found')
      res.redirect('/posts/' + user_id)
    }

    if (!await post) {
      req.flash('message_error', `post not found `)
      res.redirect('/posts/' + user_id)
    } else {
      await Post.deleteOne(post)
      req.flash('message_success', `"${post.title}" deleted successfully`)
      res.redirect('/posts/' + user_id)
    }

  } catch (err) {
    console.error(err)
    req.flash('message_error', 'internal server error')
    res.redirect('/posts/' + user_id)
  }
})

module.exports = router
