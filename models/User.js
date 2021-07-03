const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Theme = {
    light: 'THEME_LIGHT',
    dark: 'THEME_DARK'
}

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
        { type: Schema.Types.ObjectId, ref: 'list', require: true }
    ],
    userPrefs: {
        theme: { type: String, default: Theme.light }
    }
});

module.exports = User = mongoose.model('user', UserSchema);