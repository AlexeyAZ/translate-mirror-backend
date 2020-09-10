const { gql } = require('apollo-server-express')
const schema = require('./notFoundWords.schema')
const resolvers = require('./notFoundWords.resolvers')

module.exports = {
  typeDefs: gql`
    ${schema}
  `,
  resolvers,
}