const User = require('../models/userModel');

exports.createUser = (req, res) => {
  let user = new User(req.body);
  user.save();
  res.status(201).send(user);
};

exports.getUser = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
};