const express = require ('express')
const router = express.Router()

const {protect}= require('../middleware/authMiddleware')
const {
    registerUser,
    loginUser,
    getMe
}= require ('../controller/userController')
const { application } = require('express')

router.route('/').post(registerUser)
router.route('/login').get(loginUser)
router.route('/me').get(protect,getMe)


module.exports = router