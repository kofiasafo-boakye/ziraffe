const express = require("express")
const {registerUser, loginUser} = require('../controllers/AuthController.js')
// import { registerUser } from '../controllers/AuthController.js';

const router = express.Router()

// router.get('/', async(req, res)=> {res.send("Auth Route")})

router.post('/api/register', registerUser)
router.post('/api/login', loginUser)

// export default router;
module.exports = router;