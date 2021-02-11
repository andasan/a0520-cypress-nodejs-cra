require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/todo.model')

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).then(async() => {
      await User.deleteMany()
  }).then(() => mongoose.connection.close())