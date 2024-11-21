const express = require('express');
const Game = require('../models/Game');

const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
    const games = await Game.find().populate('prizes');
    res.json(games);
});

// Create a game
router.post('/', async (req, res) => {
    const newGame = new Game(req.body);
    await newGame.save();
    res.json(newGame);
});

module.exports = router;
