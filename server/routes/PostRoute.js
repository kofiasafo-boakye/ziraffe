const express = require("express")
const {createPost, getTimelinePosts} = require('../controllers/PostController')
const {upload} = require('../multerConfig')

const router = express.Router()

router.post("/", upload.single('image'), createPost)
router.get("/timeline/:id", getTimelinePosts);

module.exports = router;

