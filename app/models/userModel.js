const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  firstName: { type: String },
  lastName: { type: String }
});

module.exports = mongoose.model('users', userModel);