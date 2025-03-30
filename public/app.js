const express = require('express');
const helmet = require('helmet');
const morganLogger = require('../middleware/morganLogger');
const rateLimiter = require('../middleware/rateLimit');
const errorHandler = require('../middleware/errorHandler');
const authMiddleware = require('../middleware/authMiddleware');

// Routes imports
const countdownRoutes = require('../routes/countdownRoute');
const userRoutes = require('../routes/userRoute');
const envelopeRoutes = require('../routes/envelopeRoute');
const totalBudgetRoutes = require('../routes/totalBudgetRoute');
const wishListRoutes = require('../routes/wishlistRoutes');

// Initialize express app
const app = express();

// Middleware Setup
app.use(express.json()); // For parsing application/json
app.use(helmet()); // For securing HTTP headers
app.use(morganLogger); // For logging HTTP requests
app.use(rateLimiter); // For limiting repeated requests


// API Routes
app.use('/api/users', userRoutes);
app.use('/envelopes', envelopeRoutes);
app.use('/totalBudget', totalBudgetRoutes);
app.use('/wishlist', wishListRoutes);
app.use('/countdown', countdownRoutes);

// Health check endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

// Root endpoint
app.get('/', (req, res) => res.send('Hello! Your API is running.'));

// Error handling middleware
app.use(errorHandler);

document.addEventListener("DOMContentLoaded", () => {
    const totalBudgetEl = document.getElementById("totalBudget");
    const updateBudgetBtn = document.getElementById("updateBudgetBtn");
    const envelopeForm = document.getElementById("envelope-form");
    const envelopeGallery = document.getElementById("envelope-gallery");

    // Update Total Budget logic
    updateBudgetBtn.addEventListener("click", async () => {
        const totalAmount = document.getElementById("totalAmount").value;
        if (!totalAmount) return alert("Please enter a total amount!");

        try {
            const response = await axios.post("/api/totalBudget", { totalAmount: parseFloat(totalAmount) });
            totalBudgetEl.textContent = response.data.totalAmount;
            document.getElementById("totalAmount").value = ''; // Clear input
        } catch (error) {
            console.error("Error updating total budget", error);
        }
    });

    // Envelope creation logic
    envelopeForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const amount = document.getElementById("envelopeAmount").value;

        if (!title || !amount) return alert("Please fill out the title and amount!");

        try {
            // Post envelope data to backend
            const response = await axios.post("/envelopes", { title, amount });
            console.log(response.data.message);

            // Create envelope card in DOM
            const envelopeCard = document.createElement("div");
            envelopeCard.classList.add("envelope");
            envelopeCard.innerHTML = `
                <div>
                    <h3>${title}</h3>
                    <p>Amount: $${amount}</p>
                </div>
                <button class="delete-btn">X</button>
            `;
            envelopeGallery.appendChild(envelopeCard);

            // Clear input fields
            document.getElementById("title").value = '';
            document.getElementById("envelopeAmount").value = '';
        } catch (error) {
            console.error("Error creating envelope", error);
        }
    });

    // Delete envelope logic
    envelopeGallery.addEventListener("click", async (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const envelopeCard = event.target.closest(".envelope");
            envelopeGallery.removeChild(envelopeCard);

            // Here you should delete the envelope from the backend (implement API for deletion)
            const title = envelopeCard.querySelector("h3").textContent;
            try {
                await axios.delete(`/envelopes/${title}`); // Adjust this based on your backend delete logic
            } catch (error) {
                console.error("Error deleting envelope", error);
            }
        }
    });
});

module.exports = app;
