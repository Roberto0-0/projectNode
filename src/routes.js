const { Router } = require('express')
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const homeController = require('./controllers/homeController')
const publicationController = require('./controllers/publicationController')

const router = Router()

router.use('/', homeController)
router.use('/auth', userController)
router.use('/', postController)
router.use('/', publicationController)

module.exports = router
