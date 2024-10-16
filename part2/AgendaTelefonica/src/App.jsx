import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';


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

  // busquedor de usuario
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

      
      <Filter value={search} onchange={handleSearch} />
      
      <h3>add a new</h3>

      <PersonForm
        subtim={handleSubmit} 
        controllers={[newName, newPhoneNumber]}
        onchange={handleChange} />

        
      <h3>Numbers</h3>
      <Persons 
        filter={filteredPersons}
        searchValue={search}
        personsList={persons}/>
    
    
    </div>
  )
}

export default App
