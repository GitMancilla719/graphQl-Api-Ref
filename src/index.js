const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Accounts = require('./model/Accounts')

const resolvers = require('./schema/resolvers/resolvers')
const typeDefs = require('./schema/typDefs')

const RunApolloServer = async () => {
  const app = express()
  app.use(cors())

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true, // any clients that send operations via GET requests or multipart upload requests must include a non-empty Apollo-Require-Preflight
    cache: 'bounded', // protects your server from attacks that exhaust available memory, causing a DOS
    context: ({ req }) => ({ 
      req,
      Accounts
      // test: () => console.log('test')
    })
  })
  
  try {
    await server.start()
    server.applyMiddleware({ app })
    app.listen({port: 5000}, () => console.log('Server UP'))
  } catch (error) {
    console.log(error)
  }
}

const connectMongo = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/gql', { useNewUrlParser: true })
      console.log('DB UP')
  } catch (error) {
      console.log(error)
  }
}

connectMongo()
RunApolloServer()


