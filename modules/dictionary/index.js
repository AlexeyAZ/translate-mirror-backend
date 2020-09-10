const { gql } = require('apollo-server-express')
const schema = require('./dictionary.schema')
const resolvers = require('./dictionary.resolvers')

module.exports = {
  typeDefs: gql`
    ${schema}
  `,
  resolvers,
}