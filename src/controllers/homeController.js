class HomeController {
  index(req, res) {
    res.render('layout/index.ejs', {
      message_success: req.flash('message_success'),
      message_error: req.flash('message_error')
    })
  }
}

module.exports = new HomeController()
