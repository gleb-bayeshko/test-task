import React from "react";

function FormCheckbox(props) {
  return (
    <div className="content__checkbox-container">
      <label htmlFor="case-check" className="checkbox__label content__label">
        Case sensitivity
      </label>
      <input
        type="checkbox"
        name="case-check"
        id="case-check"
        className="checkbox content__checkbox"
      />
    </div>
  );
}

export default FormCheckbox;
