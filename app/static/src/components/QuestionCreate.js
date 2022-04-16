import React, { useState, useRef } from "react";
import QuestionAnswer from "../components/QuestionAnswer";
import { useFormik } from "formik";
import { useNavigate, createSearchParams } from "react-router-dom";

const QuestionCreate = ({ question }) => {
  const [correctAnswer, setCorrectAnswer] = useState(question.correct);
  const [prompt, setPrompt] = useState(question.prompt);
  const forms = useRef();

  // Handle form submission
  const validate = (values) => {
    const errors = {};

    // Prompt
    if (!values.prompt) {
      errors.prompt = "Required";
    } else if (values.prompt.length > 40) {
      errors.prompt = "Must be 40 characters or less";
    }

    // Answers
    if (!values.answer0) {
      errors.answer0 = "Required";
    } else if (values.answer0.length > 40) {
      errors.answer0 = "Must be 40 characters or less";
    }

    if (!values.answer1) {
      errors.answer1 = "Required";
    } else if (values.answer1.length > 40) {
      errors.answer1 = "Must be 40 characters or less";
    }

    if (!values.answer2) {
      errors.answer2 = "Required";
    } else if (values.answer2.length > 40) {
      errors.answer2 = "Must be 40 characters or less";
    }

    if (!values.answer3) {
      errors.answer3 = "Required";
    } else if (values.answer3.length > 40) {
      errors.answer3 = "Must be 40 characters or less";
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
      prompt: "",
      answer0: "",
      answer1: "",
      answer2: "",
      answer3: "",
      correct: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div key={"create"} className="question-creation">
      <div className="features-small-item">
        <ul>
          <form
            onSubmit={formik.handleSubmit}
            className="question-form"
            id={"create"}
            ref={(element) => (forms.current = element)}
          >
            {/* Header */}
            <h3>Create New Question</h3>
            <li className="question-selection-header editing">
              <textarea
                className="prompt-text-area"
                name="prompt"
                id="prompt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.prompt}
                placeholder="Prompt"
              ></textarea>
            </li>
            {formik.touched.prompt && formik.errors.prompt ? (
              <div className="error">{formik.errors.prompt}</div>
            ) : null}

            {/* Answers */}
            {Object.entries(question.answers).map((answerData, answerCount) => {
              var answerIndex = answerData[0];
              var answer = answerData[1];

              return (
                <QuestionAnswer
                  key={answerIndex + "ans"}
                  questionID={"create"}
                  answerID={answerIndex}
                  correctAnswer={correctAnswer}
                  editingQuestion={"create"}
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
          <button form="create" type="submit" className={"side-button"}>
            Create
          </button>
        </ul>
      </div>
    </div>
  );
};

export default QuestionCreate;
