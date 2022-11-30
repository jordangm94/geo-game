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
      //Use post response to create new game in DB, return object with information
      let response = await fetch("http://localhost:8001/api/games/101", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      //Store new game information from DB in a variable
      let gameData = await response.json();
      setGame(gameData); //This will set state of game to value of gameData object from DB
      setTurn(gameData.turns[0]) //This will set the turn to the first first turn in the game
    }

    fetchData();
  }, []);
  
  //Create a function that increments through array of turn objects and sets state to new turn object each time answer button is clicked
  const nextTurn = function() {
    console.log(game)
    // setTurn(game.turns)
    console.log(turn)
  };

  return (
    <main>
      {game && (
        <>
          <GameStatus />,
          <QuestionMap />,
          <AnswerMap />,
          <Button gameData={game} onClick={nextTurn} className={"button-game-answer"} title={"Answer"} />
        </>
      )}
    </main>
  );
};