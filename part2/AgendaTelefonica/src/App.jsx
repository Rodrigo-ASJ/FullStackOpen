import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification'
import personsService from './services/persons'


const App = () => {
  const [ notification , setNotification] = useState({ message: null, status:''});

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

    if (existPerson){
      const wantChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      
      if(wantChange){ 
        const findPerson = persons.find( person => person.name === newPerson.name);
        const changedPerson = {...findPerson, number: newPerson.number}
          
          personsService.update(findPerson.id, changedPerson )
            .then( change => {
              setPersons( prev => prev.map( person => person.id !== change.id ? person : change  )) 
              // mostrar notificación
              setNotification({ message: `Changed ${change.name} with new number ${change.number}`, status: 'success' });
              // limpiar notificación
              setTimeout(()=>{ setNotification( (prev) => { return {...prev, message: null} })}, 5000)
                })
            .catch( (error) => {
              console.log(error);
              
              setPersons( prev => prev.filter( persona => persona.name !== changedPerson.name)) 
              // mostrar notificación
              setNotification({ message: `Information of ${changedPerson.name} has already been removed from server`, status: 'error' });
              // limpiar notificación
              setTimeout(()=>{ setNotification( (prev) => { return {...prev, message: null} })}, 5000)
            })
      }else{
         console.log('no actualizar') 
        }
      
    }else{
        personsService.create(newPerson)
          .then( response => {
            setPersons( prevPersons => prevPersons.concat(response));
            // mostrar notificación
            setNotification({ message: `Added ${response.name}`, status: 'success' });
            // limpiar notificación
            setTimeout(()=>{ setNotification( (prev) => { return {...prev, message: null} })}, 5000)
          })
          .catch( error => {
            // está es la forma de acceder al mensaje de error
            console.log("error al añadir un usuario:", error.response.data.error)
            // mostrar notificación
              setNotification({ message: `${error.response.data.error}`, status: 'error' });
              // limpiar notificación
              setTimeout(()=>{ setNotification( (prev) => { return {...prev, message: null} })}, 5000)


          })
      }

  }

  function handleDelete(id){

    const findPerson = persons.find( person => person.id === id);
    const confirm = window.confirm(`Delete el ${findPerson.name} ?`);

    confirm 
      ? personsService.deletePerson(id)
        .then( setPersons( prev => prev.filter(person => person.id !== id)) )
      : console.log('cancel')
    
  }



  

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification note={notification} />
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
