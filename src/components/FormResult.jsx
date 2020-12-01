import React from "react";

function FormResult(props) {
  return (
    <div className="content__result-container">
      {props.loading && <p className="content__result-word">Loading...</p>}
      {props.words.map((word, i) => <p className="content__result-word" key={`${i}-${word}`}>{word}</p>)}
    </div>
  );
}

export default FormResult;
