const express = require("express")
const {createPost, getTimelinePosts, getPost, postComment, likePost} = require('../controllers/PostController')
const {upload} = require('../multerConfig')

const router = express.Router()

router.post("/", upload.single('image'), createPost)
router.get("/timeline/:id", getTimelinePosts);
router.get("/:id", getPost);
router.post("/addComment/:id", postComment);
router.post("/likePost/:id", likePost)

module.exports = router;

