require('dotenv').config();
const mongoose = require('mongoose');

// Import your models
const Prize = require('./models/Prize');
const Game = require('./models/Game');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Sample data
const prizes = [
    {
        name: "Free Pizza",
        description: "Win a free pizza for your next order!",
        image: "https://example.com/pizza.jpg",
        eligibilityCriteria: "Complete a game"
    },
    {
        name: "Free Fries",
        description: "Get free fries with your next order!",
        image: "https://example.com/fries.jpg",
        eligibilityCriteria: "Spin the wheel and win"
    },
    {
        name: "Free Pepsi",
        description: "Win a free Pepsi with your next meal!",
        image: "https://example.com/pepsi.jpg",
        eligibilityCriteria: "Answer trivia questions"
    }
];

const games = [
    {
        title: "Spin the Wheel",
        description: "Spin the wheel to win exciting prizes!",
        type: "Spin",
        rules: "Spin the wheel and land on a prize to win.",
        schedule: new Date()
    },
    {
        title: "Trivia Quiz",
        description: "Answer trivia questions to win prizes!",
        type: "Trivia",
        rules: "Answer all questions correctly within the time limit.",
        schedule: new Date()
    },
    {
        title: "Catch the Item",
        description: "Catch falling items to win prizes!",
        type: "Action",
        rules: "Catch as many items as you can within the time limit.",
        schedule: new Date()
    },
    {
        title: "Memory Match",
        description: "Match all the cards to win prizes!",
        type: "Memory",
        rules: "Find and match all the pairs of cards before time runs out.",
        schedule:  new Date()
    }
    
    
    
];

// Populate database
const seedDatabase = async () => {
    try {
        // Clear existing data
        await Prize.deleteMany({});
        await Game.deleteMany({});
        
        console.log('Cleared existing data.');

        // Insert sample data
        const insertedPrizes = await Prize.insertMany(prizes);
        console.log('Inserted Prizes:', insertedPrizes);

        // Link prizes to games
        games[0].prizes = [insertedPrizes[0]._id, insertedPrizes[1]._id];
        games[1].prizes = [insertedPrizes[2]._id];

        const insertedGames = await Game.insertMany(games);
        console.log('Inserted Games:', insertedGames);

        // Close connection
        mongoose.connection.close();
        console.log('Database populated and connection closed.');
    } catch (err) {
        console.error('Error populating database:', err);
        mongoose.connection.close();
    }
};

seedDatabase();
