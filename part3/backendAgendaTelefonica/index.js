const express = require('express');
const data = require('./data/persons.json') 
const morgan = require('morgan')







let persons = [
		{
			"id": 1,
			"name": "Arto Hellas",
			"number": "040-123456"
		},
		{
			"id": 2,
			"name": "Ada Lovelace",
			"number": "39-44-5323523"
		},
		{
			"id": 3,
			"name": "Dan Abramov",
			"number": "12-43-234345"
		},
		{
			"id": 4,
			"name": "Mary Poppendieck",
			"number": "39-23-6423122"
		}
	]

//creamos el servidor
const app = express();




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
  
  morgan.token('pepo', function (req, res) { return JSON.stringify(req.body) })

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :pepo'))
 
app.get('/api/persons', (request, response) =>{
    response.status(200).json(persons);
})

app.get('/info', (request, response) =>{

    const maxPersons = persons.length;
    const date = new Date();
    const template = `<p>Phonebook has info for ${maxPersons} people</p><p>${date}</p>`

    response.status(200).send(template);
})




app.get('/api/persons/:id', (request, response) =>{

    const id = Number(request.params.id);
    const findPerson = persons.find( person => person.id === id);

    if(!findPerson){
        return response.status(404).send({
            error: 'Person not found'
        });
    }

    response.status(200).json(findPerson);

})

app.delete('/api/persons/:id', ( request, response) =>{
	const id = Number(request.params.id);
    findPerson = persons.find( person => person.id === id);
   if(!findPerson){
    return response.status(404).send({
        error: 'Person not found'
    });
   }
    persons = persons.filter( person => person.id !== id);
	response.status(204).end()
})

app.post('/api/persons', ( request, response)=>{

    const body = request.body;
    const findPerson = persons.find( person => person.name === body.name);

    //validamos que los campos sean correctos
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name and number are required'
        });
    }if(findPerson){
        return response.status(400).json({
            error: 'Person already exists, the name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);

});

const generateId = ()=>{
    const maxId = persons.length > 0 
        ?  Math.floor( Math.random() * (persons.length + 100) ) 
        : 0;

    return maxId + 1;
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

