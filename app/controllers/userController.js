const passport = require('passport');
require('../services/passport');

const User = require('../models/userModel');

exports.createUser = (req, res, next) => {
  passport.authenticate('createUser', {session: false}, (err, user, info) => {
    if (err && !user) {
      res.status(401).send(err); 
    } else {
      res.json(user);
    }
  })(req,res,next);
};

exports.userLogin = (req, res, next) => {
  passport.authenticate('userLogin', {session: false}, (err, msg, info) => {
    if (err) {
      res.status(401).send(err); 
    }
    if (info !== undefined) {
      res.json(info);
    } else {
      res.json(msg);
    }
  })(req,res,next);
}

exports.getUser = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err) {
      res.status(500).json(err);
    }
    if (user) {
      res.json(user);
    }
    if (info) {
      res.json(info);
    }
  })(req,res,next);
};

exports.getAllUsers = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err) {
      res.status(500).json(err);
    }
    if (user) {
      User.find({}, (err, users) => {
        if (err) {
          res.json(err);
        } else {
          res.json(users);
        }
      });
    }
    if (info) {
      res.status(500).send(info.message);
    }
  })(req, res, next);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {$set: req.body}, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
};