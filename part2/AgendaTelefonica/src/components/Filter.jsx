import React from 'react'

const Filter = ({ value , onchange }) => {
  return (
    <label>
          filter shown with 
         <input type="text" value={value} onChange={onchange}/>
    </label>
  )
}

export default Filter