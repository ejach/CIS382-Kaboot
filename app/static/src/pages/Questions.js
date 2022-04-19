import React, { useEffect, useState, Fragment } from "react";
import { useFormik } from "formik";
import axios from "axios";
import QuestionSelect from "../components/QuestionSelect";
import QuestionCreate from "../components/QuestionCreate";
import { useNavigate, createSearchParams } from "react-router-dom";

const Questions = () => {
  let navigate = useNavigate();
  const [questions, setQuestions] = useState();
  const [selected, setSelected] = useState([]);

  const getQuestions = () => {
    axios
      .get(`/flask/api/questions`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // Handle form submission
  const validate = (values) => {
    const errors = {};

    // Selected questions
    if (values.length < 3) {
      errors.selected = "You must select at least three questions";
    }

    if (editing === 1) {
      errors.editing = "You must confirm any changes before starting an exam";
    }

    return errors;
  };

  // create formik hook
  const formik = useFormik({
    initialValues: {
      title: "",
      points: "",
      time: "",
    },
    validate,
    onSubmit: (values) => {
      var post = {
        type: "add",
        message: {
          room: {
            title: values,
            question_duration: values.prompt,
            room_points: values.prompt,
            questions: selected,
          },
        },
      };

      axios
        .post("http://localhost:5000/flask/api/rooms", post)
        .then((response) => {
          navigate({
            pathname: "/waiting",
            search: `?${createSearchParams({ code: response.code })}`,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const [editing, setEditing] = useState(-1);

  var newQuestion = {
    prompt: "",
    answers: ["", "", "", ""],
    correctAnswer: "",
  };

  if (questions) {
    return (
      <>
        <div className="container">
          <div className="selection-area">
            <div className="header-text">
              <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                <h2>Select Exam Questions</h2>
                <button
                  form="create-room"
                  type="submit"
                  className={
                    formik.isSubmitting ? "side-button-frozen" : "side-button"
                  }
                  disabled={formik.isSubmitting}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="question-grid">
          {Object.entries(questions).map((questionData) => {
            var index = questionData[0];
            var question = questionData[1];

            return (
              <QuestionSelect
                updateQuestions={getQuestions}
                editing={editing}
                setEditing={setEditing}
                index={index}
                question={question}
              ></QuestionSelect>
            );
          })}

          <QuestionCreate
            key={"add"}
            updateQuestions={getQuestions}
            index={"add"}
            question={newQuestion}
          ></QuestionCreate>
        </div>
      </>
    );
  } else {
    return (
      <Fragment>
        <div id="preloader">
          <div className="jumper">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Questions;
