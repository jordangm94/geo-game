import { useState, useEffect } from 'react';
import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';
import Button from '../components/Button';

export default function Game() {
  const [game, setGame] = useState(null);
  console.log(game)

  useEffect(() => {
    async function fetchData() {
      //Use post response to create new game in DB, return object with information
      let response = await fetch("http://localhost:8001/api/games/101", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      //Store new game information from DB in a variable
      let gameData = await response.json();
      //Set state of game to the response object
      setGame(gameData)
    }
    
    fetchData();
  }, []);
  console.log(game)
  // useEffect(() => {
  //   async function fetchData() {
  //     let response = await fetch("http://localhost:8001/api/games/101", {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' }
  //     });
  //     let newData = await response.json();
  //     console.log(newData)
  //     // setState(newData);
  //   }

  //   console.log(fetchData())
  //   fetchData();
  // }, []);


  return (
    <main>
      {game && (
        <>
      <GameStatus />, 
      <QuestionMap />,
      <AnswerMap />,
      <Button className={"button-game-answer"} title={"Answer"} />
      </>
      )}
    </main>
  );
};