import { useState, useEffect } from 'react';
import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';
import Button from '../components/Button';

export default function Game() {
  // const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://localhost:8001/api/games/101", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      let newData = await response.json();
      console.log(newData)
      // setState(newData);
    }

    fetchData();
  }, []);

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
      <GameStatus />, 
      <QuestionMap />,
      <AnswerMap /> 
      <Button className={"button-game-answer"} title={"Answer"} />
    </main>
  );
};