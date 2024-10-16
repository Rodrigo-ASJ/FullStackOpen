import React from 'react'

const PersonForm = ({ subtim, controllers, onchange })=>{
    const [ newName, newPhoneNumber ] = controllers
    return(
        <form onSubmit={subtim}>

        <div>
          name: <input name="name" value={newName} onChange={onchange}/>
        </div>
        <div>number: <input 
                        name="phone"
                        value={newPhoneNumber} 
                        onChange={onchange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm