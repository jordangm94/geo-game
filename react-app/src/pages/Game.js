import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';
import Button from '../components/Button';

export default function Game() {
  // let Microsoft = window.Microsoft;

  return (
    <main>
      <GameStatus />, 
      <QuestionMap />,
      <AnswerMap /> 
      <Button className={"button-game-answer"} title={"Answer"} />
    </main>
  );
};