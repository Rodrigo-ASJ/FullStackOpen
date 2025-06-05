require('dotenv').config();
const express = require('express');
const Note = require('./models/note');
const http = require('node:http');
const cors = require('cors');

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
	
];*/

const app = express();

app.use(cors())
// middleware para servir archivos estáticos
app.use(express.static('dist'))
//json-parser 
app.use(express.json())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

  app.use(requestLogger)  

/*
const app = http.createServer((request, response) => {
	response.writeHead(200, { 'Content-type': 'application/json'});
    response.end(JSON.stringify(notes));
});
*/

app.get('/', (request, response) =>{
    response.send('<h1>Hello World</h1>');
})

app.get('/api/notes', ( request, response) =>{
	Note.find({}).then( notes =>{
		response.json(notes);
	});
    
});

app.get('/api/notes/:id', (request, response, next) => {
	//const id = Number(request.params.id)

	//const note = notes.find(note => note.id === id)
	
	Note.findById(request.params.id)
		.then( note => {
			if(note){
				response.json(note);
			}else{
				response.status(404).end();
			}
		
		})
		.catch(error => { 
			//console.log(error);
			//response.status(400).send({ error: 'malformatted id' }); 
			next(error)
		})
	
	/*if (note) {
		response.json(note)
	  } else {
		response.status(404).end()
	  } */
})


app.delete('/api/notes/:id', ( request, response, next) =>{
	//const id = Number(request.params.id);
	const id = request.params.id;

	Note.findByIdAndDelete(id)
		.then( result => {
			// eliminar una nota que existe
			response.status(204).end(); // 204 no content
		})
		.catch( error =>{
			// eliminar una nota que no existe
			next(error);
		});
	
	// notes = notes.filter(note => note.id !== id);
	// response.status(204).end()
})


const generateId = () => {
	const maxId = notes.length > 0
	  ? Math.max(...notes.map(n => n.id))
	  : 0
	return maxId + 1
}

app.post('/api/notes', (request, response, next) => {
	const body = request.body
  
	if (!body.content) {
	  return response.status(400).json({ 
		error: 'content missing' 
	  })
	}
  
	const note = new Note({
	  content: body.content,
	  important: Boolean(body.important) || false,
	// id: generateId(),
	});

	//notes = notes.concat(note);

	note.save()
	.then( savedNote =>{
		response.json(savedNote)
	}).catch( error => {
			//console.log(error);
			next(error);
		});
  
	//response.json(note)
})


app.put( "/api/notes/:id", ( request , response, next) =>{

	const id = request.params.id;
	const body = request.body;

	//objeto JavaScript normal como argumento, y no un nuevo objeto de nota creado con la función constructora Note
	const note = {
		content: body.content,
   		important: body.important,
	}
  
	Note.findByIdAndUpdate( id , note, { new: true, runValidators: true, context: 'query'})
	 .then( updateNote =>{
		response.json(updateNote);
	 })
	 .catch( error =>{
		next(error);
	 })

});


const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

  // controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
  
	if (error.name === 'CastError') {
	  return response.status(400).send({ error: 'malformatted id' })
	} else if ( error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
  
	next(error)
}

// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
