const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.db.url, { useNewUrlParser: true });
// mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

// https://mongoosejs.com/docs/deprecations.html
// mongoose.set('useFindAndModify', false);

// eslint-disable-next-line no-console
mongoose.connection.once('open', () => console.log('Connected to a MongoDB instance'));
// eslint-disable-next-line no-console
mongoose.connection.on('error', error => console.error(error));

module.exports = mongoose;