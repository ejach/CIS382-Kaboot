/* eslint-disable eqeqeq */
import React, { useState } from "react";

const RadioButton = ({
  editing,
  questionID,
  answerID,
  correctAnswer,
  setCorrectAnswer,
}) => {
  const [value, setValue] = useState(correctAnswer == answerID);

  function handleChange(e) {
    if (editing === questionID) {
      setCorrectAnswer(e.target.value);
      setValue(e.target.value === answerID);
    }
  }

  return (
    <>
      <label>
        <input
          className="radio-button"
          type="radio"
          name="correct"
          value={answerID}
          checked={value}
          readOnly={true}
          tabIndex="-1"
        ></input>
        <img
          onClick={(e) => {
            e.target.value = answerID;
            handleChange(e);
          }}
          src={
            correctAnswer == answerID
              ? require("../images/selected.png")
              : require("../images/empty_select.png")
          }
          style={{ display: !(editing === questionID) && "none" }}
          alt=""
        />
      </label>
    </>
  );
};

export default RadioButton;
