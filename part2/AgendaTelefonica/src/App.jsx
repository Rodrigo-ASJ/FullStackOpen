import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  //Controladores del formulario
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  // busqueda
  const [search, setSearch] = useState('');
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


  function handleSearch(e){
    const target = e.target.value;
    setSearch(target)
  }

  

  function handleChange(e){
    const target = e.target;
    target.name === "name" ? 
      setNewName( target.value) : setNewPhoneNumber(target.value)
  }

  function handleSubmit(e){
    e.preventDefault();

    const newPerson = { name: newName, number: newPhoneNumber }
    const existPerson = persons.some( person => person.name === newPerson.name)
   

    existPerson ? window.alert(`${newName} is already added to phonebook`): setPersons( prevPersons => prevPersons.concat(newPerson) );

  }

  return (
    <div>
      <h2>Phonebook</h2>

      
        <label>
          filter shown with 
         <input type="text" value={search} onChange={handleSearch}/>
        </label>
      
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          name: <input name="name" value={newName} onChange={handleChange}/>
        </div>
        <div>number: <input 
                        name="phone"
                        value={newPhoneNumber} 
                        onChange={handleChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { search ? 
        filteredPersons.map(filter => <p key={filter.name}>{filter.name} {filter.number}</p>) 
        : persons.map( person =><p key={person.name} >{person.name} {person.number}</p>)
      }
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
