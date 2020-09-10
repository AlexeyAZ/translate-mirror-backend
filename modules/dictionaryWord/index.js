const { gql } = require('apollo-server-express')
const schema = require('./dictionaryWord.schema')
const resolvers = require('./dictionaryWord.resolvers')

module.exports = {
  typeDefs: gql`
    ${schema}
  `,
  resolvers,
}