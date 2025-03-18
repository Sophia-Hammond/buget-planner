const WishList = require('../models/wishlistModel');
const User = require('../models/userModel');

const addItemToWishlist = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Item name is required. Please add the item name and submit again!'});
        }

        const newItem = new WishList({
            user: req.user._id,
            name
        });

        await newItem.save();
        res.status(201).json({ message: 'Item added to your Wish list!', item: newItem});
    } catch (err) {
        res.status(500).json({ error: 'Error adding item to wishlist, please try again' });
    }
};

const getWishlist = async (req, res) => {
    try {
        const wishListItems = await WishList.find({ user: req.user._id, purchased: false });
        res.status(200).json(wishListItems);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving your wishlist'});
    }
};

const markAsPurchased = async (req, res) => {
    try{
        const { id } = req.params;

        const item = await WishList.findOne({ _id: id, user: req.user._id });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        item.purchased = true;
        await item.save();
        res.status(200).json({ message: 'Item has been marked as purchased', item});
    } catch (err) {
        res.status(500).json({ error: 'Error occured when trying to mark as purchased'});
    }
};

const deleteItemFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await WishList.findOneAndDelete({ _id: id, user: req.user._id });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json({ message: 'Item removed from wishlist' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting item from wishlist' });
    }
};

module.exports = {
    addItemToWishlist,
    getWishlist,
    markAsPurchased,
    deleteItemFromWishlist
}; 

