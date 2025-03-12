const Envelope = require('../models/envelope');

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
        res.status()
    }
}