const mongoose = require('mongoose');

const PrizeSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    eligibilityCriteria: String,
});

module.exports = mongoose.model('Prize', PrizeSchema);
