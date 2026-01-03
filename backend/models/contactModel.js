const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] 
    },
    phone: { type: String, required: [true, 'Phone is required'] },
    message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);