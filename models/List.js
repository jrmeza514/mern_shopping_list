const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Items = require("./Items");

const ListSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }

});
const List = mongoose.model('list', ListSchema);
module.exports = List;