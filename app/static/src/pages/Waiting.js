import React, { Fragment, useContext, useState, useEffect } from "react";
import { SocketContext } from "../context/socket";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Waiting = () => {
  const socket = useContext(SocketContext);
  const [startedExam, setStartedExam] = useState(false);
  const [seconds, setSeconds] = useState();
  const [timer, setTimer] = useState(new Date().getTime());
  const [complete, setComplete] = useState(false);

  const [answers, setAnswers] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });

  const [entered, setEntered] = useState(false);

  const [submittedAnswer, setSubmittedAnswer] = useState();

  const [examQuestions, setExamQuestions] = useState();
  const [questionDuration, setQuestionDuration] = useState();
  const [points, setPoints] = useState();

  const [activeQuestion, setActiveQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(-1);

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const nickname = searchParams.get("nickname") || "Host";
  const host = searchParams.get("host");

  socket.on("message", (message) => {
    if (message["type"] === "startExam") {
      // Get answers
      axios
        .get("/flask/api/questions")
        .then((response) => {
          for (const [index, question_id] of Object.entries(
            message["data"]["questions"]
          )) {
            if (question_id.length === 1) {
              message["data"]["questions"][index] = {
                prompt: response["data"][question_id]["prompt"],
                answers: response["data"][question_id]["answers"],
              };
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setExamQuestions(message["data"]["questions"]);
      setQuestionDuration(message["data"]["question_duration"]);
      setPoints(message["data"]["room_points"]);
    } else if (message["type"] === "advanceQuestion") {
      if (examQuestions && examQuestions[activeQuestionIndex + 1]) {
        setStartedExam(timer);
        setSeconds(questionDuration);
        setActiveQuestion(examQuestions[activeQuestionIndex + 1]);
        setActiveQuestionIndex(activeQuestionIndex + 1);
        setSubmittedAnswer();

        setAnswers({
          A: 0,
          B: 0,
          C: 0,
          D: 0,
        });
      } else {
        setActiveQuestion();
        setActiveQuestionIndex();
        setSeconds();
      }
    } else if (message["type"] === "answer") {
      console.log(message["answer"]);
      var key = message["answer"];
      setAnswers({ ...answers, [key]: answers[message["answer"]] + 1 });
    } else {
      toast(message["prompt"], { toastId: message["prompt"] });
    }
  });

  useEffect(() => {
    setTimeout(() => setTimer(timer + 1), 1000);
    if (seconds) {
      let elapsed = timer - startedExam;
      setSeconds(questionDuration - elapsed);
    }

    if (startedExam) {
      if (seconds <= 0) {
        setSubmittedAnswer();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    if (!entered) {
      socket.emit("enterRoom", code, nickname);
      setEntered(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (target) => {
    if (!submittedAnswer) {
      setSubmittedAnswer(target);
      socket.emit("submitAnswer", code, nickname, target);
    }
  };

  return (
    <Fragment>
      <div className="features-wide-item">
        {/* Waiting text */}
        <h3
          className="features-title"
          style={{ display: (activeQuestion || complete) && "none" }}
        >
          {startedExam ? "Starting in" : "Room Code"}
        </h3>

        {/* Question prompt */}
        <h3 className="features-title">
          {activeQuestion ? activeQuestion["prompt"] : ""}
        </h3>

        {/* Countdown */}
        <h1 className="features-title">{seconds}</h1>
        <h1 style={{ display: startedExam && "none" }}>{code}</h1>
        <button
          style={{ display: (seconds > 0 || !host) && "none" }}
          className="main-button"
          onClick={() => {
            if (examQuestions) {
              if (examQuestions[activeQuestionIndex + 1]) {
                socket.emit("advanceQuestion", code);
              } else {
                setActiveQuestion();
                setSeconds();
              }
            } else {
              socket.emit("startExam", code);
            }
          }}
        >
          {startedExam ? "CONTINUE" : "START EXAM"}
        </button>
      </div>
      <div
        className="question-grid"
        style={{
          display: (!activeQuestion || (submittedAnswer && !host)) && "none",
        }}
      >
        <div className="large-answer-selection">
          <div
            className="features-small-item-A"
            onClick={() => {
              onSelect("A");
            }}
          >
            <h1
              className="large-answer"
              style={{ fontSize: (!host && "xx-large") || "medium" }}
            >
              {activeQuestion && host
                ? Object.values(activeQuestion["answers"])[0]
                : "A"}
            </h1>
          </div>
        </div>
        <div className="large-answer-selection">
          <div
            className="features-small-item-B"
            onClick={() => {
              onSelect("B");
            }}
          >
            <h1
              className="large-answer"
              style={{ fontSize: (!host && "xx-large") || "medium" }}
            >
              {activeQuestion && host
                ? Object.values(activeQuestion["answers"])[1]
                : "B"}
            </h1>
          </div>
        </div>
        <div className="large-answer-selection">
          <div
            name="C"
            className="features-small-item-C"
            onClick={() => {
              onSelect("C");
            }}
          >
            <h1
              name="C"
              className="large-answer"
              style={{ fontSize: (!host && "xx-large") || "medium" }}
            >
              {activeQuestion && host
                ? Object.values(activeQuestion["answers"])[2]
                : "C"}
            </h1>
          </div>
        </div>
        <div className="large-answer-selection">
          <div
            className="features-small-item-D"
            onClick={() => {
              onSelect("D");
            }}
          >
            <h1
              className="large-answer"
              style={{ fontSize: (!host && "xx-large") || "medium" }}
            >
              {activeQuestion && host
                ? Object.values(activeQuestion["answers"])[3]
                : "D"}
            </h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Waiting;
