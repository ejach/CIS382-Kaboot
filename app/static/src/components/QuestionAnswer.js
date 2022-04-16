import React, { useState } from "react";
import RadioButton from "../components/RadioButton";

const QuestionAnswer = ({
  questionID,
  editingQuestion,
  count,
  answerID,
  correctAnswer,
  setCorrectAnswer,
  title,
  formik,
}) => {
  // Handle form submission
  // Create submit button
  var classes = "answer";

  if (answerID === correctAnswer) {
    classes = classes + " correct";
  }

  return (
    <>
      <li
        className={classes + (editingQuestion === questionID ? " editing" : "")}
      >
        <textarea
          className={"answer-text-area"}
          name={title}
          id={answerID}
          readOnly={editingQuestion === questionID ? false : true}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values["answer" + count]}
          placeholder={"Answer"}
        ></textarea>
      </li>
      {formik.touched["answer" + count] && formik.errors["answer" + count] ? (
        <div className="error">{formik.errors["answer" + count]}</div>
      ) : null}
      <RadioButton
        questionID={questionID}
        editing={editingQuestion}
        answerID={answerID}
        correctAnswer={correctAnswer}
        setCorrectAnswer={setCorrectAnswer}
      ></RadioButton>
      <br />
    </>
  );
};

export default QuestionAnswer;
