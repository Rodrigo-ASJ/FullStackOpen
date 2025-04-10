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
//json-parser 
app.use(express.json())

// middleware para servir archivos estáticos
app.use(express.static('dist'))
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

app.get('/api/notes/:id', (request, response) => {
	//const id = Number(request.params.id)

	//const note = notes.find(note => note.id === id)
	
	Note.findById(request.params.id).then( note => {
		response.json(note);
	})
	
	/*if (note) {
		response.json(note)
	  } else {
		response.status(404).end()
	  } */
  })


app.delete('/api/notes/:id', ( request, response) =>{
	const id = Number(request.params.id);

	notes = notes.filter(note => note.id !== id);

	

	response.status(204).end()
})


const generateId = () => {
	const maxId = notes.length > 0
	  ? Math.max(...notes.map(n => n.id))
	  : 0
	return maxId + 1
  }

  app.post('/api/notes', (request, response) => {
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

	note.save().then( savedNote =>{
		response.json(savedNote)
	})
  
	//response.json(note)
  })

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
