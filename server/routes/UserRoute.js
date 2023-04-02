const express = require("express")
const {getMe} = require('../controllers/UserController')
const {requireAuth} = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/me', requireAuth, getMe)


module.exports = router;