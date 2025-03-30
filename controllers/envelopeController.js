
// importing the envelope model
const Envelope = require('../models/envelopeModel'); 

//
const createEnvelope = async (req, res) => {
    const { title, amount } = req.body;

    if (!title || !amount || typeof title !== 'string' || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Invalid input. Please add your title and amount. '});
    }

    try {
        const newEnvelope = new Envelope({ title, amount });
        await newEnvelope.save();
        res.status(201).json({message: 'Your Envelope has been created!', envelope: newEnvelope});
    } catch (error) {
        res.status(500).json({error: 'error, your envelope was not created, please try again'});
    }
};


const getAllEnvelopes = async (req, res) => {
    try {
        const allEnvelopes = await Envelope.find();
        res.json(allEnvelopes);
    } catch (error) {
        res.status(500).json({ error: 'We have not retrieved the envelopes, please try again.'});
    }
};

const getTotalBudget = async (req, res) => {
    try {
        const totalBudget = await Envelope.aggregate([
            { $group: { _id: null, total: { $sum: '$amount'} } }
        ]);
        res.json({ totalBudget: totalBudget[0]?.total || 0 });
    } catch (error) {
        res.status(500).json({ error: 'Budget undetermined, error in calculation, please try again.'});
    }
};

module.exports = { createEnvelope, getAllEnvelopes, getTotalBudget };