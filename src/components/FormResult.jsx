import React from "react";

function FormResult(props) {
  return (
    <div className="content__result-container">
      {props.loading && <p className="content__result-word">Loading...</p>}
      {props.words.map((word, i) => {
        return (
          <div className="content__result-row" key={`${i}-${word}`}>
            <p className="content__result-word">{word}</p>
            <p className="content__result-word_length">{`${word.length} chars`}</p>
          </div>
        );
      })}
    </div>
  );
}

export default FormResult;
