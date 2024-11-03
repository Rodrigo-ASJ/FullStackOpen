import { useState, useEffect } from "react"
import  countriesService  from './services/countries'
import Countrys from "./components/Country";



function App() {
  const [ search , setSearch] = useState('');
  const [ countries , setCountries] = useState([])
  const [ findCountry , setFindCountry ] = useState([]);
  const [ showCountry, setShowCountry] = useState(null);

  
  
  //controlador de buscador
  const handleChange = (event) =>{
    const target = event.target;
    setSearch( prev => target.value);
  }

  useEffect( ()=>{
    // cargar los datos de los paises
    countriesService.getAllCountries()
      .then( result => {
       // console.log('resultado:',result);
        setCountries(result);
      })
      .catch( error => console.log(error))
  },[]);

  useEffect(() =>{
    if(search === ''){ return setFindCountry([])}

    //comprobar si existe el pais
    const isContry = countries.some( country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  
    if(isContry){
      // crea un array con los paises que coinciden con el buscador
      const findCountry = countries.filter( country => country.name.common.toLowerCase().includes(search.toLowerCase()))
      //console.log(findCountry)
      setFindCountry(findCountry);
      // limpiar el showCountry
      setShowCountry(null)
    }

  },[search])


  function showInfo(data){
    setShowCountry(data)
  }

  return (
    <>
    <label>
      find countries
        <input 
          type="text"
          onChange={handleChange}
          value={search}
        />
        <div>
          <h1>Countries</h1>
          
          { 
          showCountry 
            ? <Countrys data={showCountry}/>
            : findCountry.length >= 10
              ? <div>Too many matches,specify another filter</div>
              : findCountry.length === 1 
                ? <Countrys data={findCountry[0]} />
                : findCountry.length >= 2 
                  ? findCountry.map( country => <p key={`${country.area}-${country.name.common}`}>{ country.name.common} <button onClick={()=> showInfo(country) }>show</button></p> ) 
                  : ""
        
          }
        </div>
    </label>
      
    </>
  )
}

export default App
