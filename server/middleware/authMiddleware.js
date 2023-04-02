const jwt = require('jsonwebtoken')


const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    //check if json web token exists & is verified
    if(token){
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect('http://localhost:3000/')
                // res.redirect('/')
            }
            else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('http://localhost:3000/')
        // res.redirect('/')
    }
}

module.exports = {requireAuth}