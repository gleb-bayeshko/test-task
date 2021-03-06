import React from "react";

function FormButtons(props) {
  return (
    <div className="content__buttons-container">
      <button className="content__button button" onClick={props.handleLengthButton}>Word length</button>
      <button className="content__button button" onClick={props.handleSubstringButton}>Substring</button>
    </div>
  );
}

export default FormButtons;
