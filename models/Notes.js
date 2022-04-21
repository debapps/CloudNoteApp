const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: String,
    description: String,
    tag: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('notes', noteSchema);

module.exports = Note; 