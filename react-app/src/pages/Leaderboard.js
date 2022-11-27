import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [state, setState] = useState([]);

  useEffect(async () => {
    let response = await fetch("http://localhost:8001/api/users/scores");
    let newData = await response.json();
    setState(newData);
  }, []);

  let scoreElements = state.map(line =>
    (<li>{line.user_name}: {line.total}</li>));

  return (
    <div>
      <h1>This is the leaderboard page</h1>
      <ul>{scoreElements}</ul>
    </div>
  );
}
