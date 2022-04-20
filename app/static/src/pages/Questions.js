import React, { useEffect, useState, Fragment } from "react";
import { useFormik } from "formik";
import axios from "axios";
import QuestionSelect from "../components/QuestionSelect";
import QuestionCreate from "../components/QuestionCreate";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

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

  const onSelect = (question_id, isSelected) => {
    if (isSelected) {
      setSelected((arr) => [...arr, question_id]);
    } else {
      setSelected(
        selected.filter((value) => {
          return question_id !== value;
        })
      );
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // Handle form submission
  const validate = (values) => {
    const errors = {};

    // Selected questions
    if (selected.length < 3) {
      errors.selected = "You must select at least three questions";
    }

    if (editing !== -1) {
      errors.editing = "You must confirm any changes before starting an exam";
    }

    return errors;
  };

  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const points = searchParams.get("points");
  const time = searchParams.get("time");

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
            title: title,
            question_duration: time,
            room_points: points,
            questions: selected,
          },
        },
      };

      console.log(post);
      axios
        .post("/flask/api/room", post)
        .then((response) => {
          navigate({
            pathname: "/waiting",
            search: `?${createSearchParams({
              code: response["data"]["code"],
              host: true,
            })}`,
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
        <div className="creation-area">
          <div>
            <h2>Select Exam Questions</h2>

            <button
              form="create-room"
              type="submit"
              className={
                formik.isSubmitting ? "main-button-frozen" : "main-button"
              }
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              Create
            </button>
            {formik.submitCount > 0 && formik.errors.selected ? (
              <div className="error features-small-item">
                {formik.errors.selected}
              </div>
            ) : null}
            {formik.submitCount > 0 && formik.errors.editing ? (
              <div className="error features-small-item">
                {formik.errors.editing}
              </div>
            ) : null}
          </div>
        </div>
        <div className="question-grid">
          {Object.entries(questions).map((questionData) => {
            var index = questionData[0];
            var question = questionData[1];

            return (
              <QuestionSelect
                onSelect={onSelect}
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
