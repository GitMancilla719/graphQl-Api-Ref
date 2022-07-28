const {sign} = require('jsonwebtoken')

const createToken = (user) => {
  const accessToken = sign({ id: user._id, email: user.email }, '12345', { expiresIn: '1d'})
  return accessToken
}

module.exports = createToken