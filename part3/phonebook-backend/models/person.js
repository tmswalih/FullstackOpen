const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: [8,'Phone number must be 8 characters long'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
       message: props => `${props.value} is not a valid phone number`
    }
  }
})


const Person = mongoose.model('Person', personSchema)

module.exports = Person