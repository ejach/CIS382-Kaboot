import React, { useState, useRef } from "react";
import QuestionAnswer from "../components/QuestionAnswer";
import { useFormik } from "formik";

const QuestionSelect = ({ editing, setEditing, index, question }) => {
  const [correctAnswer, setCorrectAnswer] = useState(question.correct);
  const [prompt, setPrompt] = useState(question.prompt);

  function saveQuestion(targetIndex) {
    var form = forms.current[targetIndex];

    var post = {
      type: "edit",
      message: {
        question: {
          prompt: form.elements.prompt.value,
          answers: {
            [form.elements.answer0.id]: form.elements.answer0.value,
            [form.elements.answer1.id]: form.elements.answer1.value,
            [form.elements.answer2.id]: form.elements.answer2.value,
            [form.elements.answer3.id]: form.elements.answer3.value,
          },
          correct: correctAnswer,
        },
      },
    };

    console.log(post);
  }

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
      prompt: question.prompt,
      answer0: question.answers[Object.keys(question.answers)[0]],
      answer1: question.answers[Object.keys(question.answers)[1]],
      answer2: question.answers[Object.keys(question.answers)[2]],
      answer3: question.answers[Object.keys(question.answers)[3]],
      correct: question.correct,
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
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
          <button className={"side-button"}>Select</button>

          <button
            className={"edit"}
            onClick={() => {
              if (formik.isValid) {
                if (editing === index) {
                  setEditing(-1);
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
