const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    name: {

        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    purchased: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;