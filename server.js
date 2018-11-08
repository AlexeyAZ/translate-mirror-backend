const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
const passport = require('passport')
const logger = require('morgan');
const cors = require('cors');

const errorHandlers = require('./middleware/errorHandlers');

const port = process.env.PORT || 5000;
const db = require('./database');
const app = express();

const user = require('./app/routes/userRouter');

db.on('error', console.error.bind(console, 'Connection database error'));
db.once('open', () => console.log('Connected to database'));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//   next();
// });
app.use(cors());
app.use(logger('dev'));
app.use(methodOverride());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());
app.use(passport.initialize());

app.get('/', (req, res) => res.send('translate-mirror app server'));

app.use('/api/users', user);
app.use(errorHandlers.logErrors);
app.use(errorHandlers.clientErrorHandler);
app.use(errorHandlers.errorHandler);

app.listen(port, () => console.log(`http://localhost:${port}`));