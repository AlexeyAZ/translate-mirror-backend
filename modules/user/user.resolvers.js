const { AuthenticationError } = require('apollo-server');
const User = require('./user.model.js');
const Post = require('../post/post.model.js');

const { verify } = require('../../jwt');

const resolvers = {
  Query: {
    getAllUsers: (parent, args, context) => {
      console.log(context.token)
      return verify(context.token, success => {
        return User.find({})
          .exec()
          .then(users => users)
          .catch(err => err)
      })
    },
    getUser: (parent, { _id }, context) => {
      return verify(context.token, success => {
        return User.findById(_id)
          .exec()
          .then(result => result)
          .catch(err => err)
      })
    },
    getAllUserPosts: (parent, { _id }) => {
      return Post.find({authorId: _id})
        .exec()
        .then(data => data)
    },
    loginUser: (parent, user) => {
      return User.findOne({ email: user.email })
        .exec()
        .then(findUser => {
          if(findUser) {
            if (findUser.authenticateUser(user.password)) {
              return findUser.toAuthJSON()
            }
            throw new AuthenticationError('Wrong password');
          }
          throw new AuthenticationError('User not found');
        })
        .catch(err => err)
    }
  },
  Mutation: {
    createUser: (parent, user) => {
      return User.create({
        nickName: user.nickName,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        role: 'User',
      })
        .then(user => {
          return user.toAuthJSON()
        })
        .catch(err => err)
    },
    createSuperAdmin: (parent, user) => {
      return User.create({
        nickName: '',
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        role: 'SuperAdmin',
      })
        .then(user => {
          return user.toAuthJSON()
        })
        .catch(err => err)
    }
  }
};

module.exports = resolvers;