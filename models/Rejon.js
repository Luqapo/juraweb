const mongoose = require('mongoose');

const RejonSchema = mongoose.Schema({
    region: String,
    rejon: String
});

module.exports = mongoose.model('Rejon', RejonSchema, 'Rejon');