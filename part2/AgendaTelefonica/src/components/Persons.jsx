import Person from "./Person"

const Persons = ({filter, searchValue, personsList }) =>{
    return(
        <>
            { searchValue ? 
                filter.map(filter => <Person key={filter.name} name={filter.name} number={filter.number}/>) 
                : personsList.map( person =><Person key={person.name} name={person.name} number={person.number}/>)
            }
        </>
    )
}

export default Persons