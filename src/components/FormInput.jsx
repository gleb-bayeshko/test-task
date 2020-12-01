import React from 'react';

function FormInput(props) {
 return (
  <input type="text" value={props.inputValue} onChange={props.handleInput} className="content__input input "/>
 )
}

export default FormInput;