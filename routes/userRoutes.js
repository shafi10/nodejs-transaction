const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const {postRegistration , postLogin, getUser} = require('../controllers/userControllers')

router.post('/signup', postRegistration)
router.post('/login', postLogin)
router.get('/user',auth, getUser)


module.exports = router;