import React, { useState } from "react";

import FormInput from "./FormInput";
import FormButtons from './FormButtons';
import FormCheckbox from './FormCheckbox';
import FormResult from './FormResult';

function FormContainer() {
 const [inputValue, setInputValue] = useState('');
 const [isCaseSensitivityOn, setIsCaseSensitivityOn] = useState(false);

 const handleInput = e => {
  setInputValue(e.target.value)
 }

  return (
    <section className="content">
      <div className="wrapper">
        <h1 className="content__title title">Test task</h1>
        <FormCheckbox />
        <FormInput inputValue={inputValue} handleInput={handleInput} />
        <FormButtons />
        <FormResult />
      </div>
    </section>
  );
}

export default FormContainer;
