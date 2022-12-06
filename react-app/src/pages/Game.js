import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';
import Button from '../components/Button';
import Popup from '../components/Popup';
import NullPositionError from '../components/NullPositionError';
import GameSummary from '../components/GameSummary';
import { useGameData } from './hooks/gameData';

export default function Game(props) {
  let {
    game,
    turn,
    popupMessage,
    popupMessageClass,
    position, setPosition,
    errorState,
    summary,
    score,
    playAgain,
    nextTurn,
  } = useGameData(props.userID);

  return (
    <main>
      {(game && !summary) && (
        <>
          <GameStatus turnNumber={turn.turn_number} turnScore={score} />
          <QuestionMap turn={turn} />
          <AnswerMap position={position} setPosition={setPosition} />
          <Button position={position} onClick={nextTurn} className={"button-game-answer"} title={"Answer"} />
        </>
      )}
      {popupMessage && (<Popup message={popupMessage} messageClass={popupMessageClass} />)}
      {errorState && (<NullPositionError />)}

      {summary && (<GameSummary game={game} playAgain={playAgain} />)}
    </main>
  );
};