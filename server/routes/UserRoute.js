const express = require("express")
const {getUser} = require('../controllers/UserController')
const {requireAuth} = require('../middleware/authMiddleware')

const router = express.Router()

//the protecting routes is not working and was preventing me from getting the data
// router.get('/profile/:id', requireAuth, getUser)
router.get('/profile/:id', getUser)


module.exports = router;