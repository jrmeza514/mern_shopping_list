const express = require("express");
const auth = require('../../middleware/auth');
const router = express.Router();

const List = require('../../models/List');
const Item = require('../../models/Items');
const User = require('../../models/User');
const { json } = require("express");

/**
 * @route api/items
 * @type GET
 * @desc Sends all lists for the authenticted user. (Sorted by Dte)
 * @access Authenticted users only. 
 */

router.get('/', auth, async (req, res) => {
    let lists = await List.find({ userId: req.user.id });
    if (!lists) return res.status(404).json("No lists");
    res.json(
        await Promise.all(
            lists.map(async list => {
                const { _id, title } = list;
                const items = await Item.find({ listId: _id });
                return { _id, title, items }
            })
        )
    );
});

/**
 * @route api/items
 * @type GET
 * @desc Sends list matching id.
 * @access Authenticted users only. 
 */

router.get('/:id', auth, async (req, res) => {
    try {
        let list = await List.findById(req.params.id);
        const { id, title } = list;
        const items = await Item.find({ listId: list.id });
        res.json({ id, title, items });
    }
    catch (e) {
        res.json({ error: { msg: "list not found" } });
    }
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
    if (!title || !userId) return res.status(400).json({ error: { msg: "Params not defined" } });
    const newList = new List({ title, userId });
    User.findByIdAndUpdate(userId, { $push: { lists: newList.id } }, { useFindAndModify: false }, (err) => {
        if (err) return res.status(401).json(err);
        return newList.save().then(list => { res.json(list) });
    });
});

/**
 * @route api/lists
 * @type DELETE
 * @desc Deletes specified item if the authenticated user is the owner.
 * @access Authenticated users only.
 */
router.delete('/:id', auth, async (req, res) => {
    await List.findById(req.params.id).then(async list => {
        if (list.userId != req.user.id) return res.status(403).json({ success: false, error: "User cannot delete this post" });

        list.remove().then(() => res.json({ success: true }));
        const items = await Item.find({ listId: list.id });
        items.map(item => item.remove());
    })
        .catch(err => res.status(404).json({ success: false }));
});
module.exports = router;