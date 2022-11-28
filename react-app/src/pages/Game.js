import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';
import Status from '../components/Status';

export default function Game() {
  let Microsoft = window.Microsoft;

  return (
    <main>
      { Microsoft ?
      <>
      <GameStatus />, 
      <QuestionMap />,
      <AnswerMap /> 
      </>  
      : 
      null 
    }    
    </main>
  );
};