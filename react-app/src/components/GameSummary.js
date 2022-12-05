import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

import "./GameSummary.css";

export default function GameSummary({ game, playAgain }) {

  const navigate = useNavigate();

  const navigateToHome = function() {
    navigate('/');
  };

  let totalScore = 0;
  for (let i = 0; i < game.turns.length; i++) {
    totalScore += game.turns[i].score;
  }

  let turnElements = game.turns.map((turn, index) => {
    return (
      <li>
        <div>Round {turn.turn_number}</div>
        <div><span className="shine">{turn.score} </span>&nbsp; points</div>
        <div><span className="shine">{turn.distanceKm}</span>&nbsp; km</div>
      </li>
    );

  });

  return (
    <>
      <div className="summary-container">
        <div className="title"> Game Summary</div>
        {/* <AnswerMap className="summary-map" /> */}
        <div className="summary-results">
          <span className="subtitle">Your score is:&nbsp;<span className="shine">{totalScore}</span></span>
          <ul>
            {turnElements}
          </ul>
        </div>

        <div className="summary-button-container">
          <Button className="button-summary" title={"Play Again"} onClick={playAgain} />
          <Button className="button-summary" title={"Main Menu"} onClick={navigateToHome} />
        </div>
      </div>
    </>
  );
}