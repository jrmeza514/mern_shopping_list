const express = require("express");
const auth = require('../../middleware/auth');
const router = express.Router();

const List = require('../../models/List');
const User = require('../../models/User');

/**
 * @route api/ites
 * @type GET
 * @desc Sends all lists for the authenticted user. (Sorted by Dte)
 * @access Authenticted users only. 
 */

router.get('/', auth, (req, res) => {
    List.find({ userId: req.user.id }).then( lists => {
        res.json(lists);
    })
});

/**
 * @route api/lists
 * @type POST
 * @desc Creates new list based on submitted data.
 * @access Authenticated users only.
 */
 router.post('/', auth, (req, res) => {
    const title = req.body.title;
    const userId = req.user.id;
    if(!title || !userId) return res.status(400).json({ error: {msg: "Params not defined"}});
    const newList = new List({ title, userId });
    User.findByIdAndUpdate(userId, {$push: {lists: newList.id}}, {useFindAndModify: false}, (err) => {
        if(err) return res.status(401).json(err);
        return newList.save().then(list => {res.json(list)});
    });
});

module.exports = router;