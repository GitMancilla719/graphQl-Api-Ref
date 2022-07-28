const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  email: {
    type: {type: String, required: true, unique: true},
  },
  password: {
    type: {type: String, required: true, unique: true},
  },
})

module.exports = mongoose.model('Accounts', Schema)
