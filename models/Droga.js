const mongoose = require('mongoose');

const DrogaSchema = mongoose.Schema({
    skala: String,
    droga: String,
    wycena: String,
    przejscia: Number,
    ocena: Number
});

module.exports = mongoose.model('Droga', DrogaSchema, 'Droga');