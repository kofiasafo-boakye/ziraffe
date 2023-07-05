// const getMe = (req, res) => {
//     res.json({message: 'user data display'})
// }

var bcrypt = require('bcrypt')
var UserModel = require('../models/userModel')



// function to get one user
const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id)

        if(user){

            const {password, ...otherDetails} = user._doc;

            res.status(200).json(otherDetails)
        }
        else{
            res.status(400).json("User does not exist")
        }

        
    } catch (error) {
        res.status(500).json( error)
    }
}


//function to search for a user
const searchUser = async (req, res) => {

    const query = req.query.query

    try{
        const searchResults = await UserModel.find({
            $or: [
                {firstName: {$regex: query, $options: 'i'}},
                {lastName: {$regex: query, $options: 'i'}}

            ]
        })
        res.status(200).json(searchResults)
    } catch (error) {
        res.status(500).json( error)
    }
}


// function to update a user
const updateUser = async (req, res) => {
    const id = req.params.id;

    console.log('file:',req.file.filename)
    // console.log('req.body: ', req.body)
    console.log('fname: ', req.body.firstName)

    // console.log(req.body["firstName"])

    try {
        // const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true}) old code
        const user = await UserModel.findByIdAndUpdate(id, {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, profilePicture: req.file.filename}, {new: true}) 
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json( error)

    }

    // const {currentId, currentUserAdminStatus, password} = req.body;

    // if(id === currentId || currentUserAdminStatus ){

    //     if(password){
    //         const salt = await bcrypt.genSalt(10)
    //         req.body.password = await bcrypt.hash(password, salt)
    //     }


    //     try {
    //         const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true})
    //         res.status(200).json(user)
    //     } catch (error) {
    //         res.status(500).json( error)

    //     }
    // }
    // else{
    //     res.status(403).json("Access denied!!! You can only update your profile")
    // }
}


// function to delete a user

const deleteUser = async (req, res) => {
    const id = req.params.id;

    const {currentId, currentUserAdminStatus} = req.body;

    if(id === currentId || currentUserAdminStatus){

        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json( error)

        }
    }

} 

// function to follow a user
const followUser = async (req, res) => {
    // id of user to be followed
    const id = req.params.id;

    // id of user who wants to follow another user
    const currentUserId = req.body.sId;

    console.log("utbf:", id)
    console.log("uwwtfso:", currentUserId)
    //console.log("req.body.sId", req.body.sId)

    // if(currentUserId === id) {
    //     res.status(403).json("Dont do that! You cannot follow yourself");
    // }
    // else{
    //     /*its good to do try and catch when going into a database*/ 
        try {
            // user to be followed
            const followUser = await UserModel.findById(id)

            // user who wants to follow
            const followingUser = await UserModel.findById(currentUserId)


            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push: {followers : currentUserId}})
                await followingUser.updateOne({$push: {following : id}})

                res.status(200).json("User Followed")
            }
            else{
                res.status(403).json("You are already following this user")
            }


        } catch (error) {
            res.status(400).json(error)
        }
    // }

}



// function to unfollow a user
const unfollowUser = async (req, res) => {
    // id of user to be followed
    const id = req.params.id;

    // id of user who wants to follow another user
    const currentUserId = req.body.sId;

    // if(currentUserId === id) {
    //     res.status(403).json("Dont do that! You cannot follow yourself");
    // }
    // else{
        /*its good to do try and catch when going into a database*/ 
        try {
            // user to be unfollowed
            const unfollowUser = await UserModel.findById(id)

            // user who wants to unfollow
            const unfollowingUser = await UserModel.findById(currentUserId)


            if(unfollowUser.followers.includes(currentUserId)){
                await unfollowUser.updateOne({$pull: {followers : currentUserId}})
                await unfollowingUser.updateOne({$pull: {following : id}})

                res.status(200).json("User unFollowed")
            }
            else{
                res.status(403).json("User is not followed by you")
            }


        } catch (error) {
            res.status(400).json(error)
        }
    // }

}



module.exports = {getUser, updateUser, searchUser, followUser, unfollowUser}