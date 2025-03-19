const Countdown = require('../models/countdownModel');


exports.setNextPaymentDate = async (req, res) => {
    try {
        const { nextPaymentDate } = req.body;
        const userId = req.user.id;

        if (!nextPaymentDate) {
            return res.status(400).json({ message: 'Next payment date is required'});
        }

        let countdown = await Countdown.findOne({ userId });

        if (countdown) {
            countdown.nextPaymentDate = nextPaymentDate;
        } else {
            countdown = new Countdown({ userId, nextPaymentDate });
        }

        await countdown.save();
        res.status(200).json({ message: 'Next payment date saved', countdown });
    }catch (error) {
        res.status(500).json({ message: 'Error saving your date, please try again. '})
    }
};