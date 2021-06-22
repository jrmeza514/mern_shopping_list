const express = require("express");
const auth = require('../../middleware/auth');
const router = express.Router();

const Item = require('../../models/Items');

/**
 * @route api/ites
 * @type GET
 * @desc Sends all items for the authenticted user. (Sorted by Dte)
 * @access Authenticted users only. 
 */
router.get('/', auth, (req, res) => {
    Item.find({ userId: req.user.id })
        .sort({ date: -1 })
        .then(items => res.json(items))
});

/**
 * @route api/items
 * @type POST
 * @desc Creates new item based on submitted data.
 * @access Authenticated users only.
 */
router.post('/', auth, (req, res) => {
    const userId = req.user.id;
    const newItem = new Item({ name: req.body.name, userId });
    newItem.save().then(item => res.json(item));
});

/**
 * @route api/items
 * @type DELETE
 * @desc Deletes specified item if the authenticated user is the owner.
 * @access Authenticated users only.
 */
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id).then(item => {
        if(item.userId === req.user.id) item.remove().then(() => res.json({ success: true }));
        else res.status(403).json({success: false, error: "User cannot delete this post"});
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;