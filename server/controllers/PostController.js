const mongoose = require("mongoose")
var UserModel = require('../models/userModel')
var PostModel = require('../models/postModel')


//function to create a new post
const createPost = async (req, res) => {
    // const newPost = new PostModel(req.body) old code
    const newPost = new PostModel({userId: req.body.userId, desc: req.body.caption, image: req.file.filename, firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, profilePicture: req.body.profilePicture})

    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    // console.log(req.body)
    // console.log(req.file)
    // console.log('userId',req.body.userId)
    // console.log('desc',req.body.caption)
    // console.log('image',req.file.filename)

}

//function to get a post
const getPost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json(error)

    }
}

// function to like or unlike a post
const likePost = async (req, res) => {
    const id = req.params.id

    const userId = req.body.sId

    // console.log(req.body)
    // console.log('id', id)
    // console.log('userid', userId)

    const post = await PostModel.findById(id)

    try {
        if(!post.likes.includes(userId)){
            await post.updateOne({$push: {likes: userId}})
            res.status(200).json("Post liked")
        }
        else{
            await post.updateOne({$pull: {likes: userId}})
            res.status(200).json("Post unliked")
        }
    } catch (error) {
        res.status(500).json(error)

    }
}




// function to get Timeline Posts
const getTimelinePosts = async (req, res) => {
    const userId = req.params.id


    try {
        const currentUserPosts = await PostModel.find({userId: userId})
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                },
            },

            { 
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                },
            },
            
            {                
                $project: {
                    followingPosts: 1,
                    _id: 1
                }
            }
            
        ])
        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {return b.createdAt - a.createdAt}))
    } catch (error) {
        res.status(500).json(error)
    }
}


    


//function to post a comment
const postComment = async(req, res) => {
    const postId = req.params.id

    const post = await PostModel.findById(postId)
    
    console.log(req.body)
    console.log(req.body.sId)
    try{
        await post.updateOne({$push: {
            comments: {
              userId: req.body.sId,
              text: req.body.comment,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              username: req.body.username,
              profilePicture: req.body.profilePicture

            },
          },})
        // PostModel.findByIdAndUpdate(
        //     postId,
        //     {
        //       $push: {
        //         comments: {
        //           userId: req.body.sId,
        //           text: req.body.comment,
        //           firstName: req.body.firstName,
        //           lastName: req.body.lastName,
        //           username: req.body.username,
        //           profilePicture: req.body.profilePicture

        //         },
        //       },
        //     },
        //     { new: true }
        // )
        res.status(200).json("Comment successful")
      
    }catch (error) {
        res.status(500).json(error)
    }
    
}



//function to retrieve all comments
const getComments = async (req, res) => {
//     PostModel.findById(postId)
//   .then(post => {
//     if (post) {
//       const comments = post.comments;
//       console.log(comments);
//     } else {
//       console.log("Post not found");
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   });
}


module.exports = {createPost, getTimelinePosts, getPost, postComment, likePost, getComments}


