// src/models/Task.js
import mongoose from 'mongoose';

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
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    category: {
        type: String,
        enum: ['work', 'personal', 'shopping'],
        default: 'work'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, 
{ timestamps: true });


export default mongoose.model('Task', TaskSchema);