import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([]) 

  //Controladores del formulario
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  // busquedor de usuario
  const [search, setSearch] = useState('');
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))


  useEffect( () => {
    personsService.getAll()
    .then(persons => setPersons(persons))
  },[]);

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
    existPerson
      ? window.alert(`${newName} is already added to phonebook`) 
      : personsService.create(newPerson)
          .then( response => {
            setPersons( prevPersons => prevPersons.concat(response) );
        })

  }

  function handleDelete(id){

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
        personsList={persons}
        deletePerson={handleDelete}
        />
    
    
    </div>
  )
}

export default App
