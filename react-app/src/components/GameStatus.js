import "./GameStatus.css";

export default function GameStatus(props) {

  return (
    <div className="game-status-component">
      <div className="inner-game-status">
        <div className="game-status-round">
          <p className="round-title">Round</p>
          <p className="round-number">{props.turnNumber}/3</p>
        </div>
        <div className="game-status-score">
          <p className="score-title">Score</p>
          <p className="score-accumulated">{props.turnScore}</p>
        </div>
      </div>
    </div>
  );
}