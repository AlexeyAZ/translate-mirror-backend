const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userModel = new Schema({
  firstName: {
    type: String,
    unique: true
  },
  lastName: { type: String },
  password: { type: String },
  email: { type: String },
});

// userModel.methods.generateHash = (password) => {
//   return bcrypt.hashSync(password, 10);
// };

// userModel.methods.validPassword = (password) => {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('users', userModel);