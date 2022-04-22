import React, { useEffect, useState, Fragment } from "react";
import LeaderboardEntry from "../components/LeaderboardEntry";

import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Results = () => {
  const [searchParams] = useSearchParams();

  const [results, setResults] = useState();

  const room_code = searchParams.get("code");
  const title = searchParams.get("title");
  const nickname = searchParams.get("nickname");
  const points = searchParams.get("points");

  const getResults = () => {
    axios
      .get(`/flask/api/submit`, { params: { room_code: room_code } })
      .then((response) => {
        var answers = {};

        for (const [index, arr] of Object.entries(response["data"])) {
          var question_id = arr[0];
          var user_id = arr[1];
          var correct = arr[3];

          if (!answers[question_id]) {
            answers[question_id] = {};
          }

          if (!answers[question_id][user_id]) {
            answers[question_id][user_id] = correct;
          }
        }

        var correctAnswers = {};
        var total = Object.values(answers).length;
        for (const [question_id, userArray] of Object.entries(answers)) {
          for (const [user_id, correct] of Object.entries(userArray)) {
            if (!correctAnswers[user_id]) {
              correctAnswers[user_id] = 0;
            }

            if (correct) {
              correctAnswers[user_id] += 1;
            }
          }
        }

        var results = [];
        for (const [user_id, count] of Object.entries(correctAnswers)) {
          if (user_id) {
            results.push([user_id, count / total]);
          }
        }

        console.log(results);
        results.sort(function (a, b) {
          return b[1] - a[1];
        });

        setResults(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getResults();
  }, []);

  if (results) {
    return (
      <>
        <ul className="features-wide-item-leaderboard">
          <li>
            <h1 className="features-title">Results</h1>
          </li>
          <li>
            <br></br>
          </li>
          {Object.entries(results).map((resultData) => {
            var index = parseInt(resultData[0]) + 1;
            var row = resultData[1];
            var user = row[0];
            var percent = row[1];
            var userPoints = points * percent;

            if (user != "null") {
              return (
                <LeaderboardEntry
                  key={user}
                  index={index}
                  user={user}
                  points={userPoints}
                  percent={percent}
                ></LeaderboardEntry>
              );
            }
          })}
        </ul>
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

export default Results;
