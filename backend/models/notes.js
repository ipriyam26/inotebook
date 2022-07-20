// make mongoose schema for users
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    tags:{
        type:Array,
        required:true,
    }
});

const Notes = mongoose.model('notes', NotesSchema);
module.exports = Notes;