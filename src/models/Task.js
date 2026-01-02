// src/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, 
{ timestamps: true });


module.exports = mongoose.model('Task', TaskSchema);