const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//Item Model
const User = require('../../models/User');


router.get('/user', auth, (req, res) =>{
    User.findById(req.user.id)
        .select('-password')
        .then( user => res.json(user));
});

//@route POST api/auth
//@desc Auth User
//@access Public

router.post('/', (req, res) => {
    const { email, password}  = req.body;

    if (!email || !password) {
        return res.status(400).json({msg: "Please enter all fields"});
    }

    User.findOne({email})
        .then( user => {
            if(!user) return res.status(400).json({msg: "User does note exist"});


            // Create Salt & Hash
            bcrypt.compare(password, user.password)
            .then( isMatch => {
                if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"})

                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
            })
        })
        .catch();
});
 
module.exports = router;