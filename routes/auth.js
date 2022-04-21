require('dotenv').config();
const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/Users');
const getUserByToken = require('../middleware/getUser');

// Salt Rounds.
const saltRounds = 10;

// Get the secret key.
const secretKey = process.env.SECRET_KEY;

// Initialize the router.
const router = express.Router();

// Route 1: Creating a user in POST method for the endpoint: /api/auth/createuser. 
// Login not required.
router.post("/createuser", 
    body('userName', "User Name Should not be Blank!").exists(),
    body('emailID', "Please enter valid email id.").isEmail(),
    body('password', "Password should be minimum 6 char length.").isLength({ min: 6 }),
    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });
        }

        try {
            // Check if there is any user with same email id in the database.
            let emailUser = await User.findOne({ emailID: req.body.emailID });
            if (emailUser) {
                return res.status(400).json({ success: false, message: "E-mail already in use"});
            }

            // Hash the password with salt rounds.
            let hashPass = await bcrypt.hash(req.body.password, saltRounds);

            // Create the user in database.
            let user = await User.create({
                userName: req.body.userName,
                emailID: req.body.emailID,
                password: hashPass
            });

            // Sign the JWT web token taking the user id.
            let authData = {   
                userID: user.id                
            }
            let authToken = jwt.sign(authData, secretKey);

            // Send the JWT token with success.
            res.status(200).json({success: true, authToken: authToken});

        } catch(err) {
            // console.log(err.message);
            return res.status(500).json({ success: false, message: err.message});
        }
    });

// Route 2: Authenticate a user in POST method for the endpoint: /api/auth/login. 

router.post("/login", 
    body('emailID', "Please enter valid email id.").isEmail(),
    body('password', "Please enter your password to login").exists(),
    async (req, res) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });
        }

        const {emailID, password} = req.body;

        try {
            // Check if the email id exists in the database.
            let emailUser = await User.findOne({ emailID });

            // If the email id not exits.
            if (!emailUser) {
                return res.status(400).json({ success: false, message: "Please enter the correct credentials to login"});
            } 

            // Match the user password with the database hash.
            let matchPasswd = await bcrypt.compare(password, emailUser.password);

            // If the password mis-match.
            if (!matchPasswd) {
                return res.status(401).json({ success: false, message: "Please enter the correct credentials to login"});
            }

            // Sign the JWT web token taking the user id.
            let authData = {   
                userID: emailUser.id                
            }
            let authToken = jwt.sign(authData, secretKey);

            // Send the JWT token with success.
            res.status(200).json({success: true, authToken: authToken});

        } catch(err) {
            // console.log(err.message);
            return res.status(500).json({ success: false, message: err.message});
        }
    });

// Route 3: Get user details after login using POST method for the endpoint: /api/auth/getuser. 

router.get("/getuser", getUserByToken,
    async (req, res) => {
        try {
            // Get user details excluding password.
            let userDetails = await User.findById(req.userID).select('-password');

            // Send the user details as response with success.
            res.status(200).json({success: true, userDetails: userDetails});

        } catch(err) {
            // console.log(err.message);
            return res.status(500).json({ success: false, message: err.message});
        }
    });

module.exports = router;