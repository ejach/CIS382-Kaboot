import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import QuestionSelect from "../components/QuestionSelect";
import QuestionCreate from "../components/QuestionCreate";
import Loader from "../components/Loader";

const Questions = () => {
  const [questions, setQuestions] = useState();

  const getQuestions = () => {
    axios
      .get("http://localhost:5000/flask/api/questions")
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

  const [editing, setEditing] = useState(-1);

  var newQuestion = {
    prompt: "",
    answers: ["", "", "", ""],
    correctAnswer: "",
  };

  var [selected, setSelected] = useState({});

  if (questions) {
    return (
      <>
        <div className="container">
          <div className="selection-area">
            <div className="header-text">
              <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                <h2>Select Exam Questions</h2>
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
