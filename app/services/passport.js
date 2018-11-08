const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const config = require('../../config');

passport.use('createUser', new LocalStrategy(
  {
    usernameField: 'firstName',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  },
  (req, firstName, password, done) =>
    (
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return done(err)
        }
        else {
          const user = new User({
            ...req.body,
            firstName,
            password: hash
          });

          user.save((err, user) => {
            if (err) {
              return done(err);
            } else {
              return done(null, user);
            }
          });
        }
      })
    )
  )
);

passport.use('userLogin', new LocalStrategy(
  {
    usernameField: 'firstName',
    passwordField: 'password',
    session: false
  },
  (firstName, password, done) =>
    (
      User.findOne({firstName}, (err, user) => {
        if (err) {
          return done(err);
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return done(err);
            }
            if (result) {
              const jwtPayload = {
                firstName,
                password,
                _id: user._id
              };
              const jwtOptions = {
                expiresIn: '2h'
              };

              return (
                jwt.sign(
                  jwtPayload,
                  config.jwt.secret,
                  jwtOptions,
                  (err, token) => {
                    if (err) {
                      return done(err);
                    }
    
                    if (token) {
                      return done(null, {
                        message: 'Welcome to the JWT Auth',
                        token: `Bearer ${token}`
                      });
                    }
                  }
                )
              )
            }
            return done({message: 'Unauthorized Access'});
          });
        }
      })
    )
  )
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret
};

passport.use('jwt', new JwtStrategy(opts, (jwtPayload, done) => {
  User.findById(jwtPayload._id, (err, user) => {
    if (err) {
      return done(null, false, err);
    } else {
      return done(null, user);
    }
  });
}));