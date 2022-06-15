const { Router } = require('express')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const homeController = require('../controllers/homeController')
const publicationController = require('../controllers/publicationController')

class Routes {
  constructor() {
    this.router = Router()

    this.home()
    this.user()
    this.post()
    this.publication()
  }

  home() {
    this.router.get("/", homeController.index)
  }

  user() {
    this.router.get("/auth/register", userController.index)
    this.router.post("/auth/register/create", userController.create)
    this.router.get("/auth/login", userController.login)
    this.router.post("/auth/login/authentication", userController.loginAuthentication)
    this.router.get("/auth/logout", userController.logout)

  }

  post() {
    this.router.get("/posts/:user_id", postController.show)
    this.router.get("/post/create/:user_id", postController.createIndex)
    this.router.post("/posts/create/:user_id", postController.create)
    this.router.get("/posts/edit/:user_id/post/:id", postController.editIndex)
    this.router.post("/posts/edit/:user_id/post/:id", postController.edit)
    this.router.get("/posts/delete/:user_id/post/:id", postController.destroy)
  }

  publication() {
    this.router.get("/publications", publicationController.index)
    this.router.post("/publications/:user_id", publicationController.show)
    this.router.get("/publications/show/:user_id", publicationController.showIndex)
    this.router.get("/publication/edit/:user_id/publish/:id", publicationController.editIndex)
    this.router.post("/publication/edit/:user_id/publish/:id", publicationController.edit)
    this.router.get("/publication/delete/:user_id/publish/:id", publicationController.destroy)
  }
}

module.exports = new Routes().router
