import { useState, useEffect } from "react";
import "./Leaderboard.css";

import Leaderboard_Video_Pexels from './leaderboard.mp4';

export default function Leaderboard(props) {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // use get request to load data from db to state array
      let response = await fetch("http://localhost:8001/api/users/scores");
      let newData = await response.json();
      setState(newData);
    }

    fetchData();
  }, []);

  //this function returns object of each element of state array as a line of html 
  let scoreElements = state.map((line, index) => {
    return (
      <li className="leader" key={index}>
        <div>{index + 1}</div>
        <div>{line.user_name}</div>
        <div>{line.total}</div>
      </li>);
  });

  // find the logged in user in the state array
  let currentUserIndex = state.findIndex((x) => x.user_id === props.userID);
  let currentUser = state[currentUserIndex];


  return (
    <div>
      <ul className="leaderList">

        <li className="leader header" >
          <div>Rank</div>
          <div>User</div>
          <div>Score</div>
        </li>

        {/* if current user exists it will be shown on line 1 */}
        {currentUser && (<li className="leader me">
          <div><span>{currentUserIndex + 1}</span></div>
          <div><span className="crown">👑</span>{currentUser.user_name}<span className="crown">👑</span></div>
          <div>{currentUser.total}</div>
        </li>)}

        {scoreElements}
      </ul>

      <video className="leaderboardBackground" src={Leaderboard_Video_Pexels} autoPlay loop muted />
    </div>
  );
}
