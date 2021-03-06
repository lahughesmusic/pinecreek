const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: 'Username is Required'
    },

    password: {
        type: String,
        trim: true,
        required: 'Password Required',
        validate: [
            function(input) {
                return input.length >= 3;
            },
            "Password should be longer."
        ]
    },

    userCreated: {
        type: Date,
        default: Date.now
    }
})


module.exports = User = mongoose.model('users', UserSchema);