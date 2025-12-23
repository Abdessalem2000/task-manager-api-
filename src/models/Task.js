// src/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type:
        mongoose.Shema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    name: {
        type: String,
        required: [true, 'Please provide task name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, 
{ timestamps: true });


module.exports = mongoose.model('Task', TaskSchema);