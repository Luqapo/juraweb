const mongoose = require('mongoose');

const AscentSchema = mongoose.Schema({
    user: String,
    rejon: String,
    skala: String,
    droga: String,
    wycena: String,
    towjaOcena: Number,
    comment: String,
    styl: String,
    date: String
});

module.exports = mongoose.model('Ascent', AscentSchema, 'Ascent');