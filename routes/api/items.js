const express = require("express");
const auth = require('../../middleware/auth');
const router = express.Router();

//Item Model
const Item = require('../../models/Items');

//@route GET api/items
//@desc GET All Items
//@access Public

router.get('/', auth, (req, res) => {
    
    Item.find({userId: req.user.id})
        .sort({date:-1})
        .then( items => res.json(items))
});

//@route POST api/items
//@desc Create an Item
//@access Public

router.post('/', auth, (req, res) => {
    const userId = req.user.id;
    const newItem = new Item({name: req.body.name, userId});
    newItem.save().then( item => res.json(item));
});

//@route DELETE api/items:id
//@desc Delete an Item
//@access Public

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then( item => item.remove().then(() => res.json({success: true})))
        .catch( err => res.status(404).json({success: false}))
});

module.exports = router;