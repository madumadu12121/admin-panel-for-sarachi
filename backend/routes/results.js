const express = require('express');
const router = express.Router(); // Initialize the router
const Result = require('../models/Result'); // Import the Result model
const Game = require('../models/Game'); // Import the Game model
const adminAuth = require('../middleware/adminAuth'); // Import the admin middleware

// Save a game result
router.post('/', async (req, res) => {
    try {
        const { gameId, score, user } = req.body;

        if (!gameId || score === undefined || !user) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Verify if the gameId exists
        console.log('gameId received:', gameId); // Log gameId
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(400).json({ message: 'Invalid gameId' });
        }

        // Save the result
        const newResult = new Result({ gameId, score, user });
        await newResult.save();

        res.status(201).json({ message: 'Result saved successfully', result: newResult });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ message: 'Error saving result', error });
    }
});

// Fetch leaderboard
router.get('/leaderboard', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const totalResults = await Result.countDocuments();
        const leaders = await Result.find()
            .populate('gameId', 'title') // Populate the `title` field from the Game model
            .sort({ score: -1 }) // Sort by score in descending order
            .skip((page - 1) * limit) // Skip documents for previous pages
            .limit(parseInt(limit)); // Limit the number of results per page

        res.json({
            leaders,
            totalPages: Math.ceil(totalResults / limit), // Calculate total pages
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
});

// Clear leaderboard with admin access
router.delete('/clear', adminAuth, async (req, res) => {
    try {
        await Result.deleteMany({}); // Delete all results
        res.status(200).json({ message: 'Leaderboard cleared successfully' });
    } catch (error) {
        console.error('Error clearing leaderboard:', error);
        res.status(500).json({ message: 'Error clearing leaderboard', error });
    }
});

module.exports = router;


module.exports = router; // Export the router
