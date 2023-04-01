// import bcrypt from "bcrypt"
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
// import jwt from "jsonwebtoken"
// import userModel from "../models/userModel"
var UserModel = require('../models/userModel')

// function to register a new user
const registerUser = async(req, res) => {
    const {firstName, lastName, username, email, password} = req.body;

    const salt = await bcrypt.genSalt(10)
    
    const hashedPassword = await bcrypt.hash(password, salt)


    const newUser = new UserModel({firstName, lastName, username, email, password: hashedPassword})


    try{
        const emailAlreadyExists = await UserModel.findOne({email})
        const usernameAlreadyExists = await UserModel.findOne({username})
        if(usernameAlreadyExists) {
            return res.status(400).json({message: "Username already taken"})
        }

        if(emailAlreadyExists) {
            return res.status(400).json({message: "Email already taken"})
        }

        const user = await newUser.save()

        const token = jwt.sign({
            username: user.username,
            id: user._id 
        }, process.env.JWT_KEY, {expiresIn: "1h"})

        res.status(200).json({user, token})
        
    }catch (error){
        res.status(500).json({message: error.message})

    }


}

// function to login a user
const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({username: username})

        if(user){
            const validation = await bcrypt.compare(password, user.password)

            // validation? res.status(200).json(user) : res.status(400).json("Wrong user details")

            if(!validation){
                // res.status(400).json("Wrong password")
                res.status(400).json("Wrong username or password")
            }
            else{
                const token = jwt.sign({
                    id: user._id, 
                    username: user.username
                }, process.env.JWT_KEY, {expiresIn: "1h"})
                res.status(200).json({user, token})
            }
        }
        else{
            // res.status(400).json("user not found")
            res.status(400).json("Wrong username or password")
        }
    } catch (error) {
        res.status(500).json({message: error.message})

    }

    
}

module.exports = {registerUser, loginUser}