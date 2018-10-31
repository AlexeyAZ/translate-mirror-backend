const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const dbConfig = require('./config/db');

const port = process.env.PORT || 5000;
const app = express();

const user = require('./app/routes/userRouter');

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection database error'));
db.once('open', function() {
  console.log('Connected to database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('translate-mirror app server'));
app.use('/api/users', user);
app.use((req, res, next) => {
  res.status(404).send('404 page not found');
});

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});