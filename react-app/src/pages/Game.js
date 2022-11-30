import { useState, useEffect } from 'react';
import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';
import Button from '../components/Button';

export default function Game() {
  const [game, setGame] = useState(null);
  const [turn, setTurn] = useState(null);

  useEffect(() => {
    async function fetchData() {
      //Use post request to create new game in DB, returns response object with information.
      let response = await fetch("http://localhost:8001/api/games/101", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
        //Will need to add a Body: JSON stringify here for information we are sending which, will be userID
      });
      //Store new game information from DB in a variable
      let gameData = await response.json();
      setGame(gameData); //This will set state of game to value of gameData object from DB
      setTurn(gameData.turns[0]); //This will set the turn to the first first turn in the game
      // console.log(gameData.turns)
    }

    fetchData();
  }, []);
  // console.log(game)
  // console.log("Hello from turn:", turn)

  //Create a function that increments through array of turn objects and sets state to new turn object each time answer button is clicked
  const nextTurn = function() {
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
          <GameStatus />,
          <QuestionMap turn={turn} />,
          <AnswerMap />,
          <Button onClick={nextTurn} className={"button-game-answer"} title={"Answer"} />
        </>
      )}
    </main>
  );
};