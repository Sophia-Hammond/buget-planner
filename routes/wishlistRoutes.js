const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const wishListController = require('../controllers/wishListController');

router.get('/', authMiddleware, wishListController.getWish);

router.post('/', authMiddleware, wishListController.addItemToWishlist);

router.put('/:id/purchased', authMiddleware, wishListController.markAsPurchased);

router.delete('/:id', authMiddleware, wishListController.deleteItemFromWishList);

module.exports = router;
