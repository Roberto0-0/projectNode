const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const flash = require('express-flash')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('ejs').renderFile)
app.set('views engine', 'ejs')

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash())

module.exports = { app }
