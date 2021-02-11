require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/todo.model')

const dummyData = [
  {
    text: 'Eat sushi',
    done: true,
  },
  {
    text: 'Exercise.... my brain',
    done: false,
  },
  {
    text: 'Buy toothbrush',
    done: false,
  },
  {
    text: 'Eat sushi again',
    done: true,
  },
  {
    text: 'Learn Deno',
    done: false,
  },
]

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(async() => {
    await User.insertMany(dummyData)
}).then(() => mongoose.connection.close())
