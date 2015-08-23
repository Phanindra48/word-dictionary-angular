var mongoose = require('mongoose');

var bookmarkSchema = new mongoose.Schema({
    word: String,
    description: String,
    audio_url : String
});

module.exports = mongoose.model('Bookmark',bookmarkSchema);