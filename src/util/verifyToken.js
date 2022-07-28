const { AuthenticationError } = require('apollo-server-express')
const {verify} = require('jsonwebtoken')

const verifyToken = (context) => {
  const authHeader = context.req.headers.authorization

  if(authHeader === '' || authHeader == null)
    throw new Error('Authorization header must be provided')

  const token = authHeader.split('Bearer ')[1]

  if(!token)
    throw new Error('Bearer token is required')

  try {
    const checkResult = verify(token, '12345')
    return checkResult
  } catch (error) {
    console.log(error)
    throw new AuthenticationError('Unauthorized/Expired token')
  }
}

module.exports = verifyToken