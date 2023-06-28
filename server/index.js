const express = require("express")
const cors = require('cors')
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const bodyParser = require("body-parser");
const AuthRoute = require('./routes/AuthRoute.js')
const UserRoute = require('./routes/UserRoute.js')
var cookieParser = require("cookie-parser")

// import AuthRoute from './routes/AuthRoute.js'
// const User = require('./models/userModel')

// const path = require('path')

const app = express()
dotenv.config()
connectDB()
const PORT = process.env.PORT;

// app.use(express.json())
app.use(bodyParser.json({limit:'30mb', extended: true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}));
app.use(cors({origin:true, credentials: true}))
// app.use(cors())
app.use(cookieParser())
app.use('/uploads', express.static('../client/src/uploads'))



// app.post("/api/register", async (req, res) => {
//     console.log(req.body)
//     try{
//         await User.create({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
            
//         })
//         res.json({status: 'ok'})
//     } catch (error){
//         console.log(`Error: `, error.message)
//         res.json({status: 'error', error: 'Duplicate Entry'})
//     }
// })

// app.post("/api/login", async (req, res) => {
//     let user;
//     try{
//         user = await User.findOne({
//             email: req.body.email,
//             password: req.body.password
//         })
//         res.json({status: 'ok'})
//     } catch (error){
//         console.log(`Error: `, error.message)
//     }
    
//     if (user){
//         res.json({status: 'ok', user: true})
//     }
//     else{
//         return res.json({status: 'error', user: false})
//     }
// })

//auth route
app.use('/auth', AuthRoute)

// user route
app.use('/user', UserRoute)

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}...`)
})

