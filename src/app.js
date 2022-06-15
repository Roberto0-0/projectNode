const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')
const routes = require("./routes/index")

class App {
  constructor() {
    this.app = express()

    this.middleware()
    this.routes()
  }

  middleware() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())

    this.app.use(express.static(path.join(__dirname, 'public')))
    this.app.set('views', path.join(__dirname, 'views'))
    this.app.engine('ejs', require('ejs').renderFile)
    this.app.set('views engine', 'ejs')

    this.app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60000 }
    }))
    this.app.use(flash())
  }

  routes() {
    this.app.use(routes)
  }
}

module.exports = new App().app
