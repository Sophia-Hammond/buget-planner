const submitTotalBudget = async (req, res) => {
    const { totalBudget } = req.body;

    if (!totalBudget = typeof totalBudget !== 'number') {
        return res.status(400).json({ error: 'Invalid input, please provide your total budget amount.'});
    }
    try {
        console.log('Total Budget:', totalBudget);
    } catch (error) {
        res.status(500).json({ error: 'error submitting total budget, please try again!'})
    }
};

module.exports = { submitTotalBudget };