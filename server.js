const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// eslint-disable-next-line no-unused-vars
const mongoose = require('./db');
const modules = require('./modules');
const dataSources = require('./dataSources')

const words = require('./data/parseData');

const port = process.env.PORT || 5000;
const server = new ApolloServer({
  modules,
  introspection: true,
  playground: true,
  dataSources,
  context: ({ req }) => {
    const token = req.headers.authorization || null;
    return { token };
  },
  formatError: error => {
    console.log(error);
    delete error.extensions.exception;
    return error;
  },
});

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000', 'http://192.168.1.11:3000'],
  credentials: true,
}));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());

app.get('/', (req, res) => res.send('translate-mirror app'));

server.applyMiddleware({ app, cors: false, });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}${server.graphqlPath}`);
});