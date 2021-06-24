const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

/**
 * @route api/auth/user
 * @type GET
 * @description Sends back the authenticated user object. (Password excluded)
 * @access User Authenticated only.
 */
router.get('/user', auth, (req, res) =>{
    User.findById(req.user.id)
        .select('-password')
        .then( user => res.json(user));
});

/**
 * @route api/auth
 * @type POST
 * @desc Authenticates user based on submitted data and returns auth token.
 * @access User authenticated only.
 */

router.post('/', (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({msg: "Please enter all fields"});

    User.findOne({email}).then( user => {
        if(!user) return res.status(400).json({msg: "User does note exist"});
        const {id, name, email } = user;
        
        bcrypt.compare(password, user.password)
        .then( isMatch => {
            if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});
            
            const tokenCallback = (err, token) => {
                if(err) throw err;
                res.json({token, user: { id, name, email}});
            };
            
            jwt.sign({id},process.env.JWT_SECRET, { expiresIn: 3600 }, tokenCallback);
        });
    });
});
 
module.exports = router;