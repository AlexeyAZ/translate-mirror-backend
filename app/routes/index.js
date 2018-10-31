const routes = require('./userRouter');

module.exports = (app, db) => {
  routes(app, db);
};