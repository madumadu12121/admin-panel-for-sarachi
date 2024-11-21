const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    rules: String,
    prizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prize' }],
    schedule: { type: Date },
});

module.exports = mongoose.model('Game', GameSchema);
