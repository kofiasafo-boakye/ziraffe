const express = require("express")
const {registerUser, loginUser, logoutUser} = require('../controllers/AuthController.js')
// import { registerUser } from '../controllers/AuthController.js';

const router = express.Router()

// router.get('/', async(req, res)=> {res.send("Auth Route")})

router.post('/api/register', registerUser)
router.post('/api/login', loginUser)
router.get('/api/logout', logoutUser)

// export default router;
module.exports = router;