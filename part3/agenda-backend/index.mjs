import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
//json-parser 
app.use(express.json())

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    } 
  ]

app.get('/', (req, res) => {
    res.send('<h1>Notes funciona</h1>');
})

app.get('/api/persons', (req, res)=>{
    res.json(persons)
})

app.get('/api/persons/:id' ,(req, res)=>{
    const id = Number(req.params.id);
    const person = persons.find( person => Number(person.id) === id);
    person ? res.status(200).json(person) : res.status(404).end();
});

app.delete('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id);
    persons = persons.filter(person => Number(person.id) !== id);
    res.status(204).end();
    
});



function generateId(){
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0;

    return maxId + 1;

}

app.post('/api/persons',(req, res)=>{
    const newPerson = req.body;
    if(newPerson.name){
        newPerson.id = generateId();
        persons.concat(newPerson);
        res.status(201).json(newPerson);
    }else{
        res.status(400).end();
    }
});



const PORT = 3001;
app.listen(PORT, ()=>{
    console.log('funciona')
});