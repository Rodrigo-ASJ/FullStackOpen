require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const cors = require('cors')
// const data = require('./data/persons.json')
const morgan = require('morgan')

// creamos el servidor
const app = express()

app.use(cors())

// json-parser
app.use(express.json())

// middleware para servir archivos estáticos
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

morgan.token('pepo', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :pepo'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.status(200).json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    const maxPersons = persons.length
    const date = new Date()
    const template = `<p>Phonebook has info for ${maxPersons} people</p><p>${date}</p>`

    response.status(200).send(template)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then((person) => {
    if (person) {
      response.status(200).json(person)
    }
    else {
      response.status(404).send({
        error: 'Person not found',
      })
    }
  }).catch((error) => {
    next(error)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then((person) => {
      console.log(`Deleted person with id: ${id}`, person)
      response.status(204).end()
    }).catch((error) => {
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // validamos que los campos sean correctos
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and number are required',
    })
  }

  const newPerson = new Person({
    // id: generateId(),
    name: body.name,
    number: body.number,
  })

  newPerson.save()
    .then((result) => {
      console.log(result)
      response.status(201).json(newPerson)
    })
    .catch(error => next(error))
})

/* Si el usuario intenta crear una nueva entrada en la agenda para una persona cuyo nombre ya está en la agenda, el frontend intentará actualizar el número de teléfono de la entrada existente realizando una solicitud HTTP PUT a la URL única de la entrada. */
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' })
    .then((updatePerson) => {
      response.status(200).json(updatePerson)
    })
    .catch((error) => {
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

/* Manejo de errores */

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
