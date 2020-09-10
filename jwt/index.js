const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const isPlainObject = require('lodash/isPlainObject');

const config = require('../config');

const verify = (token, success) => {
  const resultToken = token.startsWith('Bearer ') ? token.replace('Bearer ', '') : token
  return jwt.verify(resultToken, config.jwt.secret, (err, decoded) => {
    if (err) {
      throw new AuthenticationError('Authentication error');
    } else {
      if (isPlainObject(decoded)) {
        return success(decoded)
      }
      throw new AuthenticationError('Authentication error');
    }
  })
}

module.exports = { verify }