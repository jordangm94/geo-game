import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';

export default function Game() {
  // let Microsoft = window.Microsoft;

  return (
    <main>
      <GameStatus />, 
      <QuestionMap />,
      <AnswerMap /> 
    </main>
  );
};