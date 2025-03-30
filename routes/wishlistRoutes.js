const express = require('express');
const { addItemToWishlist, getWishlist, markAsPurchased, deleteItemFromWishlist } = require('../controllers/wishlistController');

const router = express.Router();

// Route to get the wishlist items
router.get('/', getWishlist);

// Route to add an item to the wishlist
router.post('/', addItemToWishlist);

// Route to mark an item as purchased
router.put('/:id/mark-purchased', markAsPurchased);

// Route to delete an item from the wishlist
router.delete('/:id', deleteItemFromWishlist);

module.exports = router;

