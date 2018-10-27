const mongoose = require('mongoose');

const SkalaSchema = mongoose.Schema({
    rejon: String,
    skala: String
});

module.exports = mongoose.model('Skala', SkalaSchema);