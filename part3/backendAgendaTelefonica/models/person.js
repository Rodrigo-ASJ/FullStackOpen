const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const URL = process.env.MONGO_DB_URI

console.log('connecting to', URL)

mongoose.connect(URL)
  .then(() => {
    console.log('connected to MongoDB')
  }).catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: [true, 'User phone number required'],
    minlength: 8,
    validate: {
      validator: function (v) {
        // Validates phone number format: 123-4+
        // Adjust regex as needed for different formats
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Format should be XX-XXXXXXX or XXX-XXXXXXX`,
    },

  },
})

// modificar la respuesta de la base de datos en tiempo de ejecución, no cambia la base de datos
personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
