const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
    password: String!
    token: String
  }

  type Query {
    getAllAccounts: [User!]! # ! required
    getAccount(id: String!): User!
  }

  input registration {
    email: String!, 
    password: String!
  }

  input login {
    email: String!, 
    password: String!
  }
  type Mutation {
    login(login: login): User
    addAccount(registration: registration ): User!
  }
`

module.exports = typeDefs