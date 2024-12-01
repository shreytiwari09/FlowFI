const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// POST route for adding a new transaction
router.post('/add/:userId', async (req, res) => {
    const { name, debit,amount } = req.body;
    const { userId } = req.params;

    if (!name || debit === undefined) {
        return res.status(400).json({ message: 'Name and debit status are required' });
    }

    try {
        const newTransaction = new Transaction({
            userId,
            name,
            debit,
            amount
        });

        await newTransaction.save();

        res.status(201).json({
            message: 'Transaction added successfully',
            transaction: newTransaction,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const transactions = await Transaction.find({ userId });

        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }

        res.status(200).json({
            message: 'Transactions fetched successfully',
            transactions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
