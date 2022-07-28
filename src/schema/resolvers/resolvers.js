const verifyToken = require("../../util/verifyToken")
const createToken = require("../../util/createToken")

const resolvers = {
  Query: {
    getAllAccounts: async (parent,args,context) => {
      const user = verifyToken(context)
      console.log(user)
      return await context.Accounts.find()
    },
    getAccount: async (parent,args,context) => {
      console.log(context.req.headers.authorization)
      return await context.Accounts.find()
    },
  },
  Mutation: {
    login: async (parent, args, context) => {
      const User = await context.Accounts.findOne({email: args.login.email})
      const token = createToken(User)
      User.token = token
      return User
    },
    addAccount: async (parent, args, context) => {
      console.log(args.registration)
      const newAccount = new context.Accounts(args.registration)
      return await newAccount.save()
    }
  }
}

module.exports = resolvers