const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    lists: [
        {type: Schema.Types.ObjectId, ref: 'list', require: true}
    ]
});

module.exports = User = mongoose.model('user', UserSchema);