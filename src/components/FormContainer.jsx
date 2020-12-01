import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { wordsList } from "../actions/wordsListActions";

import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import FormCheckbox from "./FormCheckbox";
import FormResult from "./FormResult";
import { SEARCH_TYPE_LENGTH } from "../constants";

function FormContainer() {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isCaseSensitivityOn, setIsCaseSensitivityOn] = useState(false);

  const { words, loading, error } = useSelector(state => state.wordsList);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleLengthButton = async () => {
    if (+inputValue) {
      setInputError(false);
      dispatch(wordsList({
        searchType: SEARCH_TYPE_LENGTH,
        value: inputValue
      }));
    } else {
      setInputError(true);
    }
  };

  const handleSubstringButton = () => {};

  return (
    <section className="content">
      <div className="wrapper">
        <h1 className="content__title title">Test task</h1>
        {
          inputError && (
            <div className="content__error">When searching by word length, you need to enter a number</div>
          )
        }
        {
          error && (
            <div className="content__error">{error}</div>
          )
        }
        <FormCheckbox />
        <FormInput inputValue={inputValue} handleInput={handleInput} />
        <FormButtons
          handleLengthButton={handleLengthButton}
          handleSubstringButton={handleSubstringButton}
        />
        <FormResult words={words} loading={loading}/>
      </div>
    </section>
  );
}

export default FormContainer;
