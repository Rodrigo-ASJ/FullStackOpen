require('dotenv').config();
require('./mongo.js');
const express = require('express');

const Note = require('./models/note.js');

// const http = require('node:http');

const cors = require('cors');

// middlewares
const logger = require('./middlewares/loggerMiddleware.js');
const errorHandler = require('./middlewares/errorHandler.js');
/*
let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true,
	}
	
];
*/

const app = express();

app.use(cors());

// middleware para servir archivos estáticos
//app.use(express.static('dist'));

//json-parser
app.use(express.json());


app.use(logger);

/*
const app = http.createServer((request, response) => {
	response.writeHead(200, { 'Content-type': 'application/json'});
    response.end(JSON.stringify(notes));
});
*/

/*
app.get('/', (request, response, next) => {
	response.send('<h1>Hello World new</h1>');
}); */

app.use('/', express.static('dist'));

app.get('/api/notes', (request, response, next) => {
	Note.find({})
		.then((notes) => {
			response.status(200).json(notes);
		})
		.catch((error) => {
			next(error);
		});
});

app.get('/api/notes/:id', (request, response, next) => {
	//const id = Number(request.params.id)
	//const note = notes.find(note => note.id === id)
	Note.findById(request.params.id)
		.then((note) => {
			if (!note) {
				response.status(404).end();
			} else {
				response.status(200).json(note);
			}
		})
		.catch((error) => {
			next(error);
		});
});

app.delete('/api/notes/:id', (request, response, next) => {
	const id = request.params.id;
	//notes = notes.filter(note => note.id !== id);
	Note.findByIdAndDelete(id)
		.then((note) => {
			response.status(204).end();
		})
		.catch((error) => {
			next(error);
		});
});

/*
const generateId = () => {
	const maxId = notes.length > 0
	  ? Math.max(...notes.map(n => n.id))
	  : 0
	return maxId + 1
  }
	*/

app.post('/api/notes', (request, response, next) => {
	const body = request.body;

	if (!body.content) {
		return response.status(400).json({
			error: 'content missing',
		});
	}

	const newNote = new Note({
		content: body.content,
		important: body.important || false,
	});

	newNote
		.save()
		.then((savedNote) => {
			response.status(201).json(savedNote);
		})
		.catch((error) => {
			next(error);
		});

	/*
	const note = {
	  content: body.content,
	  important: Boolean(body.important) || false,
	  id: generateId(),
	}
  
	notes = notes.concat(note)
  
	response.json(note) */
});

app.put('/api/notes/:id', (req, res, next) => {
	const body = req.body;
	const id = req.params.id;

	const note = {
		content: body.content,
		important: Boolean(body.important),
	};

	Note.findByIdAndUpdate( 
			id, 
			note, 
			{ new: true, runValidators: true, context: 'query' })
		.then((updateNote) => {
			res.status(200).json(updateNote);
		})
		.catch((error) => {
			next(error);
		});
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
