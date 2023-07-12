const express = require("express")
const {createPost, getTimelinePosts, getPost, postComment} = require('../controllers/PostController')
const {upload} = require('../multerConfig')

const router = express.Router()

router.post("/", upload.single('image'), createPost)
router.get("/timeline/:id", getTimelinePosts);
router.get("/:id", getPost);
router.post("/addComment/:id", postComment);

module.exports = router;

