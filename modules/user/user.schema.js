const typeDefs = `
  type User {
    _id: String,
    nickName: String,
    firstName: String,
    middleName: String,
    lastName: String,
    password: String,
    email: String,
    token: String,
    role: String,
  },
  extend type Query {
    getAllUsers(_id: String): [User]!
    getAllUserPosts(_id: String!): [Post]
    getUser(_id: String!): User
    loginUser(email: String!, password: String!): User
  },
  extend type Mutation {
    createUser(firstName: String, password: String!, email: String!): User,
    createSuperAdmin(firstName: String, password: String!, email: String!): User,
  }
`;

module.exports = typeDefs;