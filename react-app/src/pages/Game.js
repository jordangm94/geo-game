import { useState, useEffect } from 'react';
import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';
import Button from '../components/Button';
import Popup from '../components/Popup';

export default function Game(props) {
  const [game, setGame] = useState(null);
  const [turn, setTurn] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupMessageClass, setPopupMessageClass] = useState(null);


  useEffect(() => {
    async function fetchData() {
      //Use post request to create new game in DB, returns response object with information.
      let response = await fetch(`http://localhost:8001/api/games/${props.userID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: props.userID }) //Here we pass the userID of individual logged in so it can be used in creation of game object.
      });
      //Store new game information from DB in a variable
      let gameData = await response.json();
      setGame(gameData); //This will set state of game to value of gameData object from DB
      setTurn(gameData.turns[0]); //This will set the turn to the first first turn in the game
      // console.log(gameData.turns)
    }

    fetchData();
  }, []);
  // console.log(game);
  // console.log("Hello from turn:", turn)

  // showing congrats popup with score
  function showResult(message) {
    setPopupMessageClass("hiddenMessage"); // adding class attribute to make message invisible while on the screen 
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessageClass("visibleMessage"); // adding class attribute to make it visible 
    }, 4300);
    setTimeout(() => { setPopupMessage(null); }, 10000); // remove popup from the screen
  }

  //Create a function that increments through array of turn objects and sets state to new turn object each time answer button is clicked
  const nextTurn = function() {

    showResult("Your score is 123");

    if (turn === game.turns[0]) {
      setTurn(game.turns[1]);
    }
    if (turn === game.turns[1]) {
      setTurn(game.turns[2]);
    } if (turn === game.turns[2]) {
      // console.log("Congratulations on completing the game")
    }
  };

  return (
    <main>
      {game && (
        <>
          <GameStatus />
          <QuestionMap turn={turn} />
          <AnswerMap />
          <Button onClick={nextTurn} className={"button-game-answer"} title={"Answer"} />
        </>
      )}
      {popupMessage && (<Popup message={popupMessage} messageClass={popupMessageClass} />)}
    </main>
  );
};