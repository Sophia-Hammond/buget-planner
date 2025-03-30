
const Envelope = require('../models/envelopeModel');

const createEnvelope = async (req, res) => {
    try {
        const { title, amount } = req.body;
        const newEnvelope = new Envelope({ title, amount });
        await newEnvelope.save();
        res.json({ message: 'Envelope created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating envelope' });
    }
};

const getAllEnvelopes = async (req, res) => {
    try {
        const allEnvelopes = await Envelope.find();
        res.json(allEnvelopes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching envelopes' });
    }
};

const deleteEnvelope = async (req, res) => {
    const { title } = req.params;

    try {
        await Envelope.findOneAndDelete({ title }); // Assuming title is unique
        res.json({ message: 'Envelope deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting envelope' });
    }
};

module.exports = { createEnvelope, getAllEnvelopes, deleteEnvelope };
