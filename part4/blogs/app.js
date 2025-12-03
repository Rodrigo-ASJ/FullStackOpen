const express = require('express');
const app = express();
const cors = require('cors');

//Utils
const config = require('./utils/config');
const logger = require('./utils/loggers');
const middleware = require('./utils/middleware');

//Controllers
const blogsRouter = require('./controllers/blogs.js');
const usersRouter = require('./controllers/users.js');
const loginsRouter = require('./controllers/logins.js');

//Database
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

//token extractor middleware
app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;