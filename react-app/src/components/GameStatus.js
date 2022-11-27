

export default function GameStatus() {

  return (
    <div className="game-status-component">
      <div className="inner-game-status">
        <div className="game-status-round">
          <p className="round-title">Round</p>
          <p className="round-number">1/5</p>
        </div>
        <div className="game-status-score">
          <p className="score-title">Score</p>
          <p className="score-accumulated">1500</p>
        </div>
      </div>
    </div>
  );
}