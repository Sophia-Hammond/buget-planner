const TotalBudget = require('../models/totalBudgetModel');
const Envelope = require('../models/envelopeModel');

const calculateAndSaveTotalBudget = async (req, res) => {
    try {
        const totalBudget = await Envelope.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        let existingTotalBudget = await TotalBudget.findOne();

        if (existingTotalBudget) {
            existingTotalBudget.totalAmount = totalBudget[0]?.total || 0;
            existingTotalBudget.updatedAt = Date.now();
            await existingTotalBudget.save();
        } else {
            const newTotalBudget = new TotalBudget({
                totalAmount: totalBudget[0]?.total || 0,
            });
            await newTotalBudget.save();
        }

        res.json({ totalBudget: totalBudget[0]?.total || 0});
    } catch (error) {
        res.status(500).json({ error: 'Error calculating and saving total budget, please try again'});
    }
};

module.exports = { calculateAndSaveTotalBudget };