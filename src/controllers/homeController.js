const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
  res.render('layout/index.ejs', {
    message_success: req.flash('message_success'),
    message_error: req.flash('message_error')
  })
})

module.exports = router
