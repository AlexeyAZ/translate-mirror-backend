const { Schema, model }  = require('mongoose');

const notFoundWordsSchema = new Schema({
  text: {
    type: String,
    lowercase: true
  }
});

const notFoundWords = model('notFoundWords', notFoundWordsSchema);

module.exports = notFoundWords;