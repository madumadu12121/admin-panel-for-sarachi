const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    score: { type: Number, required: true },
    user: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', ResultSchema);
