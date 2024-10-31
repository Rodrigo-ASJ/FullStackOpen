import Person from "./Person"

const Persons = ({filter, searchValue, personsList, deletePerson }) =>{
    return(
        <>
            { searchValue ? 
                filter.map(filter => <Person key={filter.name} name={filter.name} number={filter.number} perosonId={filter.id} button={deletePerson}/>) 
                : personsList.map( person =><Person key={person.name} name={person.name} number={person.number} perosonId={person.id} button={deletePerson}/>)
            }
        </>
    )
}

export default Persons