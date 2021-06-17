const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require('jsonwebtoken');

//Item Model
const User = require('../../models/User');


//@route POST api/items
//@desc Create an Item
//@access Public

router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({msg: "Please enter all fields"});
    }

    User.findOne({email})
        .then( user => {
            if(user) return res.status(400).json({msg: "Email already in use"});

            const newUser = new User({ name, email, password });

            // Create Salt & Hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser.save()
                    .then(user => {

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
                });
            });
        })
        .catch();
});
 
module.exports = router;