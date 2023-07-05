const express = require("express")
const {getUser, updateUser, searchUser, followUser, unfollowUser} = require('../controllers/UserController')
const {requireAuth} = require('../middleware/authMiddleware')
const {upload} = require('../multerConfig')

const router = express.Router()

//the protecting routes was not working and was preventing me from getting the data
// router.get('/profile/:id', requireAuth, getUser)
router.get('/profile/:id', getUser)
router.get('/searchUser', searchUser)
router.post("/editProfile/:id", upload.single('image'), updateUser)
router.post("/followUser/:id", followUser)
router.post("/unfollowUser/:id", unfollowUser)


module.exports = router;