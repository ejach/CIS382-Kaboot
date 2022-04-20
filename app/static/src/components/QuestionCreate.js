import React, { useState, useRef } from "react";
import QuestionAnswer from "../components/QuestionAnswer";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";

const QuestionCreate = ({ question, updateQuestions }) => {
  const [correctAnswer, setCorrectAnswer] = useState(question.correct);
  const forms = useRef();

  // Handle form submission
  const validate = (values) => {
    const errors = {};

    // Prompt
    if (!values.prompt) {
      errors.prompt = "Required";
    } else if (values.prompt.length > 80) {
      errors.prompt = "Must be 80 characters or less";
    }

    // Answers
    if (!values.answer0) {
      errors.answer0 = "Required";
    } else if (values.answer0.length > 80) {
      errors.answer0 = "Must be 80 characters or less";
    }

    if (!values.answer1) {
      errors.answer1 = "Required";
    } else if (values.answer1.length > 80) {
      errors.answer1 = "Must be 80 characters or less";
    }

    if (!values.answer2) {
      errors.answer2 = "Required";
    } else if (values.answer2.length > 80) {
      errors.answer2 = "Must be 80 characters or less";
    }

    if (!values.answer3) {
      errors.answer3 = "Required";
    } else if (values.answer3.length > 80) {
      errors.answer3 = "Must be 80 characters or less";
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
    onSubmit: (values, { resetForm }) => {
      var post = {
        type: "add",
        message: {
          question: {
            prompt: values.prompt,
            answers: {
              0: values.answer0,
              1: values.answer1,
              2: values.answer2,
              3: values.answer3,
            },
            correct: correctAnswer,
          },
        },
      };

      axios
        .post("/flask/api/questions", post)
        .then((response) => {
          resetForm();
          setCorrectAnswer();
          updateQuestions();
        })
        .catch((error) => {
          console.log(error);
        });
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
          <button
            form="create"
            type="submit"
            className={
              formik.isSubmitting ? "side-button-frozen" : "side-button"
            }
            disabled={formik.isSubmitting}
          >
            Create
          </button>
        </ul>
      </div>
    </div>
  );
};

export default QuestionCreate;
