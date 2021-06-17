const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    date: {
         type: Date,
         default: Date.now
    },
    userId: {
        type: String,
        require: true
    }

});

module.exports = Item = mongoose.model('item', ItemSchema);