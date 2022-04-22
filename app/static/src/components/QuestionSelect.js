import React, { useState, useRef } from "react";
import QuestionAnswer from "../components/QuestionAnswer";
import { useFormik } from "formik";
import axios from "axios";

const QuestionSelect = ({ editing, setEditing, index, question, onSelect }) => {
  const [correctAnswer, setCorrectAnswer] = useState(question.correct);
  const [selected, setSelected] = useState(false);

  // Handle form submission
  const validate = (values) => {
    const errors = {};

    // Prompt
    if (
      !values.prompt ||
      (values.prompt && values.prompt.trim().length === 0)
    ) {
      errors.prompt = "Required";
    } else if (values.prompt.length > 80) {
      errors.prompt = "Must be 80 characters or less";
    }

    // Answers
    if (
      !values.answer0 ||
      (values.ansswer0 && values.ansswer0.trim().length === 0)
    ) {
      errors.answer0 = "Required";
    } else if (values.answer0.length > 60) {
      errors.answer0 = "Must be 60 characters or less";
    }

    if (
      !values.answer1 ||
      (values.answer1 && values.answer1.trim().length === 0)
    ) {
      errors.answer1 = "Required";
    } else if (values.answer1.length > 60) {
      errors.answer1 = "Must be 60 characters or less";
    }

    if (
      !values.answer2 ||
      (values.answer2 && values.answer2.trim().length === 0)
    ) {
      errors.answer2 = "Required";
    } else if (values.answer2.length > 60) {
      errors.answer2 = "Must be 60 characters or less";
    }

    if (
      !values.answer3 ||
      (values.answer3 && values.answer3.trim().length === 0)
    ) {
      errors.answer3 = "Required";
    } else if (values.answer3.length > 60) {
      errors.answer3 = "Must be 60 characters or less";
    }

    // Correct answer
    if (!correctAnswer) {
      errors.correct = "You must mark the correct answer";
    }

    return errors;
  };

  // create formik hook
  const formik = useFormik({
    initialValues: {
      prompt: question.prompt,
      answer0: question.answer[Object.keys(question.answer)[0]],
      answer1: question.answer[Object.keys(question.answer)[1]],
      answer2: question.answer[Object.keys(question.answer)[2]],
      answer3: question.answer[Object.keys(question.answer)[3]],
      correct: question.correct,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      var post = {
        type: "edit",
        message: {
          question: {
            question_id: index,
            prompt: values.prompt,
            answer: {
              [Object.keys(question.answer)[0]]: values.answer0,
              [Object.keys(question.answer)[1]]: values.answer1,
              [Object.keys(question.answer)[2]]: values.answer2,
              [Object.keys(question.answer)[3]]: values.answer3,
            },
            correct: correctAnswer,
          },
        },
      };

      axios
        .post("/flask/api/question", post)
        .then((response) => {
          if (response["data"]["status"] !== "SUCCESS") {
            resetForm();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const forms = useRef({});
  return (
    <div key={index} className="question-selection">
      <div className="features-small-item">
        <ul>
          <form
            className="question-form"
            id={index}
            ref={(element) => (forms.current[index] = element)}
            onSubmit={formik.handleSubmit}
          >
            {/* Header */}
            <li
              className={
                "question-selection-header" +
                (editing === index ? " editing" : "")
              }
            >
              <textarea
                className={"prompt-text-area"}
                name="prompt"
                id="prompt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.prompt}
                readOnly={editing === index ? false : true}
              ></textarea>
            </li>
            {formik.touched.prompt && formik.errors.prompt ? (
              <div className="error">{formik.errors.prompt}</div>
            ) : null}

            {/* Answers */}
            {Object.entries(question.answer).map((answerData, answerCount) => {
              var answerIndex = answerData[0];
              var answer = answerData[1];

              return (
                <QuestionAnswer
                  key={answerIndex + "ans"}
                  questionID={index}
                  editingQuestion={editing}
                  answerID={answerIndex}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                  count={answerCount}
                  title={"answer" + answerCount}
                  formik={formik}
                ></QuestionAnswer>
              );
            })}
          </form>
          {formik.touched.correct && formik.errors.correct ? (
            <div className="error">{formik.errors.correct}</div>
          ) : null}
          <button
            className={"side-button" + (selected === true ? " selected" : "")}
            onClick={() => {
              onSelect(index, !selected);
              setSelected(!selected);
            }}
          >
            {selected === true ? " Selected" : "Select"}
          </button>

          <button
            className={"edit"}
            onClick={() => {
              if (formik.isValid) {
                if (editing === index) {
                  setEditing(-1);
                  formik.submitForm();
                } else {
                  setEditing(index);
                }
              }
            }}
          >
            <i>
              <img
                src={
                  editing === index
                    ? require("../images/save.png")
                    : require("../images/editing.png")
                }
                alt=""
              />
            </i>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default QuestionSelect;
