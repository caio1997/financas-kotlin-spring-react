import React from 'react'


function SelectMenu(props){

    const options = props.lista.map(option => {
       return (
           <option key={option.key} value={option.value}>{option.label}</option>
       ) 
    })


    return (

        <select {...props} >
            {options}
        </select>
    
    )
}

export default SelectMenu