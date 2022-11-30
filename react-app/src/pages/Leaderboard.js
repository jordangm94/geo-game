import { useState, useEffect } from "react";
import "./Leaderboard.css";

import Leaderboard_Video_Pexels from './leaderboard.mp4'


export default function Leaderboard() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://localhost:8001/api/users/scores");
      let newData = await response.json();
      setState(newData);
    }

    fetchData();
  }, []);

  let scoreElements = state.map((line, index) => {

    return (
      <li className="leader" key={index}>
        <div>{index + 1}</div>
        <div>{line.user_name}</div>
        <div>{line.total}</div>
      </li>);

  });

  return (
    <div>

      <ul className="leaderList">
        <li className="leader" >
          <div>Rank</div>
          <div>User</div>
          <div>Score</div>
        </li>

        {scoreElements}

      </ul>
      <video className="leaderboardBackground" src={Leaderboard_Video_Pexels} autoPlay loop muted  />
    </div>
  );
}
