const express = require('express');
const helmet = require('helmet');
const morganLogger = require('../middleware/morganLogger');
const rateLimiter = require('../middleware/rateLimit');
const errorHandler = require('../middleware/errorHandler');
const authMiddleware = require('../middleware/authMiddleware');
const countdownRoutes = require('../routes/countdownRoute');

const userRoutes = require('../routes/userRoute');
const envelopeRoutes = require('../routes/envelopeRoute');
const totalBudgetRoutes = require('../routes/totalBudgetRoute');
const wishListRoutes = require('../routes/wishlistRoutes');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morganLogger);
app.use(rateLimiter);
app.use(authMiddleware);

app.use('/api/users', userRoutes);
app.use('/envelopes', envelopeRoutes);
app.use('/totalBuget', totalBudgetRoutes);
app.use('/wishlist', wishListRoutes);
app.use('/countdown', countdownRoutes);

app.get('health', (req, res) => res.status(200).send('OK'));

app.get('/', (req, res) => res.send('Hello!'));

// Importing necessary modules (If modularization is used)
// import { fetchWishlist, addItem, markAsPurchased, deleteItem } from './wishlist.js';

// DOM Elements
const wishlistForm = document.getElementById('wishlist-form');
const wishlistItemCount = document.getElementById('wishlist-item-count');
const wishlistTotal = document.getElementById('wishlist-item-total');
const purchasedTotal = document.getElementById('purchased-item-total');
const envelopeGallery = document.querySelector('.envelope-gallery');
const purchasedItemsList = document.getElementById('purchased-items-list');

// Fetch Wishlist Items and Update UI
const fetchWishlist = async () => {
    try {
        const response = await axios.get('/wishlist');
        const items = response.data;

        // Clear the current gallery and purchased list
        envelopeGallery.innerHTML = '';
        purchasedItemsList.innerHTML = '';

        let totalWishlistAmount = 0;
        let totalPurchasedAmount = 0;

        // Loop through items and render them
        items.forEach(item => {
            // Update totals based on item status
            if (item.purchased) {
                totalPurchasedAmount += item.amount;
            } else {
                totalWishlistAmount += item.amount;
            }

            // Create and append the gallery item
            const gridItem = createWishlistItem(item);
            envelopeGallery.appendChild(gridItem);
        });

        // Update UI elements
        wishlistItemCount.textContent = items.length;
        wishlistTotal.textContent = `$${totalWishlistAmount}`;
        purchasedTotal.textContent = `$${totalPurchasedAmount}`;

    } catch (err) {
        console.error('Error fetching wishlist:', err);
        alert('Something went wrong while fetching the wishlist.');
    }
};

// Create a Wishlist Item HTML element
const createWishlistItem = (item) => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    if (!item.purchased) {
        gridItem.innerHTML = `
            <div class="wishlist-item">
                <span>${item.name} - $${item.amount}</span>
                <button class="mark-purchased">✔</button>
                <button class="delete-item">🗑️</button>
            </div>
        `;
        // Add event listeners to buttons
        gridItem.querySelector('.mark-purchased').addEventListener('click', () => markAsPurchased(item._id));
        gridItem.querySelector('.delete-item').addEventListener('click', () => deleteItem(item._id));
    } else {
        gridItem.innerHTML = `
            <div class="wishlist-item purchased">
                <span>${item.name} - $${item.amount}</span>
                <span class="purchased-tag">Purchased</span>
            </div>
        `;
    }

    return gridItem;
};

// Add Item to Wishlist
const addItem = async (itemName, itemPrice) => {
    try {
        await axios.post('/wishlist', { name: itemName, amount: itemPrice });
        fetchWishlist(); // Refresh the wishlist after adding an item
    } catch (err) {
        console.error('Error adding item to wishlist:', err);
        alert('Something went wrong while adding the item to the wishlist.');
    }
};

// Mark Item as Purchased
const markAsPurchased = async (id) => {
    try {
        await axios.put(`/wishlist/${id}/mark-purchased`);
        fetchWishlist(); // Refresh the wishlist after marking as purchased
    } catch (err) {
        console.error('Error marking item as purchased:', err);
        alert('Something went wrong while marking the item as purchased.');
    }
};

// Delete Item from Wishlist
const deleteItem = async (id) => {
    try {
        await axios.delete(`/wishlist/${id}`);
        fetchWishlist(); // Refresh the wishlist after deleting an item
    } catch (err) {
        console.error('Error deleting item:', err);
        alert('Something went wrong while deleting the item.');
    }
};

// Handle Form Submission for Adding Item
wishlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const itemPrice = document.getElementById('item-price').value;

    addItem(itemName, itemPrice); // Add the item and refresh the wishlist
});

// Fetch wishlist on page load
window.onload = fetchWishlist;
