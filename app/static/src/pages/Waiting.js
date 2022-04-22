import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { SocketContext } from "../context/socket";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";
import { useNavigate, createSearchParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Waiting = () => {
  let navigate = useNavigate();
  const date = new Date();
  const socket = useContext(SocketContext);
  const [startedExam, setStartedExam] = useState(false);
  const [seconds, setSeconds] = useState();
  const [timer, setTimer] = useState(date.getTime());
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(-1);

  const timerRef = useRef(timer);
  const activeQuestionRef = useRef(activeQuestionIndex);
  const [complete, setComplete] = useState(false);

  const [submittedAnswer, setSubmittedAnswer] = useState();

  const [questions, setQuestions] = useState();
  const questionsRef = useRef(questions);
  const [questionDuration, setQuestionDuration] = useState();
  const [points, setPoints] = useState();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const nickname = searchParams.get("nickname") || "Host";
  const host = searchParams.get("host");

  useEffect(() => {
    axios
      .get("/flask/api/room")
      .then((message) => {
        var data = message["data"][code];
        var trimmedQuestions = {};

        for (const [index, arr] of Object.entries(data["question"])) {
          var questionId = arr[0];
          var questionPrompt = arr[2];
          var answerId = arr[3];
          var answerPrompt = arr[4];
          var isCorrect = arr[5];

          if (!trimmedQuestions[questionId]) {
            trimmedQuestions[questionId] = {
              prompt: questionPrompt,
              answer: {
                [answerId]: { prompt: answerPrompt, correct: isCorrect },
              },
            };
          } else {
            trimmedQuestions[questionId]["answer"][answerId] = {
              prompt: answerPrompt,
              correct: isCorrect,
            };
          }
        }

        console.log("Setting ", trimmedQuestions);

        setQuestions(trimmedQuestions);
        setPoints(data["room_points"]);
        setQuestionDuration(data["question_duration"]);
      })
      .catch((error) => {
        console.log(error);
      });

    socket.on("message", (message) => {
      if (message["type"] === "advanceQuestion") {
        setStartedExam(timerRef.current);
        if (activeQuestionRef.current !== -1) {
          if (
            activeQuestionRef.current + 1 >=
            Object.keys(questionsRef.current).length
          ) {
            setActiveQuestionIndex();
            setStartedExam();
            setComplete(true);
          } else {
            setActiveQuestionIndex(activeQuestionRef.current + 1);
            setSubmittedAnswer();
          }
        }
      } else if (message["type"] === "answer") {
        console.log("Someone answered");
      } else {
        toast(message["prompt"]);
      }
    });

    socket.emit("enterRoom", code, nickname);

    // Begin updating room count
    try {
      setInterval(async () => {
        // const resp = await axios.get("/flask/api/room");
        // console.log(resp);
      }, 3000);
    } catch (e) {
      console.log(e);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => setTimer(timer + 1), 1000);
    timerRef.current = timer;
  }, [timer]);

  useEffect(() => {
    activeQuestionRef.current = activeQuestionIndex;
  }, [activeQuestionIndex]);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  useEffect(() => {
    let elapsed = timer - startedExam;
    if (elapsed < questionDuration) {
      setSeconds(questionDuration - elapsed);
    } else {
      setSeconds();
      if (activeQuestionIndex === -1 && startedExam) {
        // After initial countdown, start exam
        setStartedExam(timerRef.current);
        setActiveQuestionIndex(activeQuestionRef.current + 1);
      } else if (startedExam) {
        // Question ended, display correct answer
        // trimmedQuestions[questionId]["answer"][answerId] = {
        //   prompt: answerPrompt,
        //   correct: isCorrect,
        // };
        if (questions && host) {
          var question = Object.values(questions)[activeQuestionIndex];
          var answers = question["answer"];

          if (Object.values(answers)[0]["correct"]) {
            setSubmittedAnswer("A");
          } else if (Object.values(answers)[1]["correct"]) {
            setSubmittedAnswer("B");
          } else if (Object.values(answers)[2]["correct"]) {
            setSubmittedAnswer("C");
          } else {
            setSubmittedAnswer("D");
          }
        } else if (questions && !host && !submittedAnswer) {
          setSubmittedAnswer("Z");
        }
      }
    }
  }, [
    timer,
    startedExam,
    questionDuration,
    activeQuestionIndex,
    questions,
    host,
  ]);

  const onSelect = (answerIndex, letter) => {
    if (!submittedAnswer) {
      var question_id = Object.keys(questions)[activeQuestionIndex];
      setSubmittedAnswer(letter);
      socket.emit(
        "submitAnswer",
        code,
        nickname,
        question_id,
        answerIndex,
        letter
      );
    }
  };

  if (questions) {
    return (
      <Fragment>
        <div className="features-wide-item">
          {/* Waiting text */}
          <h3
            className="features-title"
            style={{
              display: (activeQuestionIndex >= 0 || complete) && "none",
            }}
          >
            {startedExam ? "Starting in" : "Room Code"}
          </h3>

          {/* Question prompt */}
          <h3 className="features-title">
            {activeQuestionIndex >= 0
              ? Object.values(questions)[activeQuestionIndex]["prompt"]
              : ""}
          </h3>

          {/* Countdown */}
          <h1 className="features-title">{seconds}</h1>
          <h1 style={{ display: (startedExam || complete) && "none" }}>
            {code}
          </h1>
          <button
            style={{ display: (seconds || (!host && !complete)) && "none" }}
            className="main-button"
            onClick={() => {
              if (complete) {
                navigate({
                  pathname: "/results",
                  search: `?${createSearchParams({
                    code: code,
                    nickname: nickname,
                    points: points,
                  })}`,
                });
              } else {
                socket.emit("advanceQuestion", code);
              }
            }}
          >
            {complete
              ? "SHOW RESULTS"
              : startedExam
              ? "CONTINUE"
              : "START EXAM"}
          </button>
        </div>
        <div
          className="question-grid"
          style={{
            display: (activeQuestionIndex < 0 || complete) && "none",
          }}
        >
          <div className="large-answer-selection">
            <div
              className="features-small-item-A"
              style={{
                opacity: submittedAnswer && submittedAnswer !== "A" && 0.5,
              }}
              onClick={() => {
                if (!host) {
                  onSelect(
                    Object.keys(
                      Object.values(questions)[activeQuestionIndex]["answer"]
                    )[0],
                    "A"
                  );
                }
              }}
            >
              <h1
                className="large-answer"
                style={{
                  fontSize: (!host && "xx-large") || "medium",
                }}
              >
                {activeQuestionIndex >= 0 && host
                  ? Object.values(
                      Object.values(questions)[activeQuestionIndex]["answer"]
                    )[0]["prompt"]
                  : "A"}
              </h1>
            </div>
          </div>
          <div className="large-answer-selection">
            <div
              className="features-small-item-B"
              style={{
                opacity: submittedAnswer && submittedAnswer !== "B" && 0.5,
              }}
              onClick={() => {
                if (!host) {
                  onSelect(
                    Object.keys(
                      Object.values(questions)[activeQuestionIndex]["answer"]
                    )[1],
                    "B"
                  );
                }
              }}
            >
              <h1
                className="large-answer"
                style={{ fontSize: (!host && "xx-large") || "medium" }}
              >
                {activeQuestionIndex >= 0 && host
                  ? Object.values(
                      Object.values(questions)[activeQuestionIndex]["answer"]
                    )[1]["prompt"]
                  : "B"}
              </h1>
            </div>
          </div>
          <div className="large-answer-selection">
            <div
              name="C"
              className="features-small-item-C"
              style={{
                opacity: submittedAnswer && submittedAnswer !== "C" && 0.5,
              }}
              onClick={() => {
                if (!host) {
                  onSelect(
                    Object.keys(
                      Object.values(questions)[activeQuestionIndex]["answer"]
                    )[2],
                    "C"
                  );
                }
              }}
            >
              <h1
                name="C"
                className="large-answer"
                style={{ fontSize: (!host && "xx-large") || "medium" }}
              >
                {activeQuestionIndex >= 0 && host
                  ? Object.values(
                      Object.values(questions)[activeQuestionIndex]["answer"]
                    )[2]["prompt"]
                  : "C"}
              </h1>
            </div>
          </div>
          <div className="large-answer-selection">
            <div
              className="features-small-item-D"
              style={{
                opacity: submittedAnswer && submittedAnswer !== "D" && 0.5,
              }}
              onClick={() => {
                if (!host) {
                  onSelect(
                    Object.keys(
                      Object.values(questions)[activeQuestionIndex]["answer"]
                    )[3],
                    "D"
                  );
                }
              }}
            >
              <h1
                className="large-answer"
                style={{ fontSize: (!host && "xx-large") || "medium" }}
              >
                {activeQuestionIndex >= 0 && host
                  ? Object.values(
                      Object.values(questions)[activeQuestionIndex]["answer"]
                    )[3]["prompt"]
                  : "D"}
              </h1>
            </div>
          </div>
        </div>
      </Fragment>
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

export default Waiting;
