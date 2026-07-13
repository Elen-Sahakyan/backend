const mongoose = require('mongoose');
const { Types } = require('mongoose').Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: Types.String,
        required: true,
        trim: true,
        minLength: 1
    },
    email: {
        type: Types.String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },
    password: {
        type: Types.String,
        required: true,
        minLength: 8
    },
    role: {
        type: Types.String,
        enum: ['member', 'organizer'],
        default: 'member'
    },
    refreshTokens: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.refreshTokens;
    return obj;
}

module.exports = mongoose.model('User', userSchema);