const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.db.url, {
  useNewUrlParser: true
});
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

module.exports = db;