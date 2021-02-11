const mongoose = require('mongoose')
const { Schema } = mongoose;

const todoSchema  = new Schema({
    text: String,
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Todo', todoSchema);