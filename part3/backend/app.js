// Express
const express = require('express');
const app = express();
const cors = require('cors');

// Configuración y utilidades
const config = require('./utils/config')
const logger = require('./utils/loggers');
const middleware = require('./utils/middleware');

//libreria para no usar try & catch
require('express-async-errors')

// Controllers
const notesRouter = require('./controllers/notes');

// Mongoose para la conexión a MongoDB
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
// middleware para servir archivos estáticos
app.use(express.static('dist'))
//json-parser 
app.use(express.json())
// middleware para registrar solicitudes
app.use(middleware.requestLogger)
// middleware para manejar solicitudes de notas
app.use('/api/notes', notesRouter)
// controlador de solicitudes con endpoint desconocido
app.use(middleware.unknownEndpoint)
//este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(middleware.errorHandler)

module.exports = app;