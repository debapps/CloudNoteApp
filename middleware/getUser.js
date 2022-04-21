require('dotenv').config();
var jwt = require('jsonwebtoken');

// Get the secret key.
const secretKey = process.env.SECRET_KEY;

// This function get the user ID from the JWT token passed in request header.

const getUserByToken = (req, res, next) => {
    try {
        let authToken = req.header('auth-token');
        let payLoad = jwt.verify(authToken, secretKey);
        req.userID = payLoad.userID;
        next();
    } catch(err) {
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }
}

module.exports = getUserByToken;