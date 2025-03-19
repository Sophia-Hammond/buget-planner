const Countdown = require('../models/countdownModel');


exports.setNextPaymentDate = async (req, res) => {
    try {
        const { nextPaymentDate } = req.body;
        const userId = req.user.id; // Assuming authentication middleware sets req.user

        if (!nextPaymentDate) {
            return res.status(400).json({ message: 'Next payment date is required' });
        }

        let countdown = await Countdown.findOne({ userId });

        if (countdown) {
            countdown.nextPaymentDate = nextPaymentDate;
        } else {
            countdown = new Countdown({ userId, nextPaymentDate });
        }

        await countdown.save();
        res.status(200).json({ message: 'Next payment date saved', countdown });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getNextPaymentDate = async (req, res) => {
    try {
        const userId = req.user.id;
        const countdown = await Countdown.findOne({ userId });

        if (!countdown) {
            return res.status(404).json({ message: 'No countdown set for this user' });
        }

        res.status(200).json({ nextPaymentDate: countdown.nextPaymentDate });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};