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
    purchased: {
        type: boolean,
        default: false
    }
}, { timestamps: true });

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;