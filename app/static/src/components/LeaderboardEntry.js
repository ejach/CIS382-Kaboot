import React, { Fragment, useState } from "react";

const LeaderboardEntry = ({ index, user, percent, points }) => {
  // Create large selections for joining or creating a room
  return (
    <li className="leaderboard-row">
      <h1 className="leaderboard-entry-tiny">{index}.</h1>
      <h1 className="leaderboard-entry">{user}</h1>
      <h1 className="leaderboard-entry-small">{Math.round(points)} pts</h1>
      <h1 className="leaderboard-entry-small">{Math.round(percent * 100)}%</h1>
    </li>
  );
};

export default LeaderboardEntry;
