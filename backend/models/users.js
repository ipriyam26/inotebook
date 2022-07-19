// make mongoose schema for users
const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now }
});

//create model from this schema
const User = mongoose.model('user', UserSchema);
module.exports = User;