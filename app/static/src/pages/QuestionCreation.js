import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionSelect from "../components/QuestionSelect";
import QuestionCreate from "../components/QuestionCreate";

const QuestionCreation = () => {
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/flask/api/questions")
      .then((response) => {
        setQuestions(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [editing, setEditing] = useState(-1);

  var newQuestion = {
    prompt: "",
    answers: ["", "", "", ""],
    correctAnswer: "",
  };

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
              editing={editing}
              setEditing={setEditing}
              index={index}
              question={question}
            ></QuestionSelect>
          );
        })}

        <QuestionCreate index={"add"} question={newQuestion}></QuestionCreate>
      </div>
    </>
  );
};

export default QuestionCreation;
