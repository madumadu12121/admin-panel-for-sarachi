const express = require('express');
const Prize = require('../models/Prize');

const router = express.Router();

// Get all prizes
router.get('/', async (req, res) => {
    const prizes = await Prize.find();
    res.json(prizes);
});

// Create a prize
router.post('/', async (req, res) => {
    const newPrize = new Prize(req.body);
    await newPrize.save();
    res.json(newPrize);
});

module.exports = router;
