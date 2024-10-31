const Person = ({ name , number, perosonId, button })=>{
    return(
        <p>{name} {number} <button onClick={() => button(perosonId)}>delete</button></p>
    )
}

export default Person