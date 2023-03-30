const express = require("express")
const cors = require('cors')
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const User = require('./models/userModel')

const app = express()
dotenv.config()
connectDB()
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())


app.post("/api/register", async (req, res) => {
    console.log(req.body)
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({status: 'ok'})
    } catch (error){
        console.log(`Error: `, error.message)
        res.json({status: 'error', error: 'Duplicate Entry'})
    }
})

app.post("/api/login", async (req, res) => {
    let user;
    try{
        user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        res.json({status: 'ok'})
    } catch (error){
        console.log(`Error: `, error.message)
    }
    
    if (user){
        res.json({status: 'ok', user: true})
    }
    else{
        return res.json({status: 'error', user: false})
    }
})


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}...`)
})