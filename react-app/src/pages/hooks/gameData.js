import { useState, useEffect } from 'react';
import axios from 'axios';

export function useGameData(userID) {
  const [game, setGame] = useState(null);
  const [turn, setTurn] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupMessageClass, setPopupMessageClass] = useState(null);
  const [position, setPosition] = useState(null); //Lifted position state into game component so that it can be passed to answer map, as well as answer button to prevent answer button switching turn if no position set.
  const [errorState, setErrorState] = useState(null); //Error state to handle conditional rendering of error message if user did not select location (position null)
  const [summary, setSummary] = useState(null);
  const [score, setScore] = useState(0); //Score state which will be dynamically adjusted per turn and shown in game status component
  const [gameNumber, setGameNumber] = useState(1);

  // used by  summary to reset all states to initial values.
  function playAgain() {
    setGame(null);
    setTurn(null);
    setPopupMessage(null);
    setPopupMessageClass(null);
    setPosition(null);
    setErrorState(null);
    setSummary(null);
    setScore(0);
    setGameNumber(gameNumber + 1);
  }

  useEffect(() => {
    async function fetchData() {
      //Use post request to create new game in DB, returns response object with information.
      let response = await fetch(`http://localhost:8001/api/games/${userID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userID }) //Here we pass the userID of individual logged in so it can be used in creation of game object.
      });
      //Store new game information from DB in a variable
      let gameData = await response.json();
      setGame(gameData); //This will set state of game to value of gameData object from DB
      setTurn(gameData.turns[0]); //This will set the turn to the first first turn in the game
    }

    fetchData();
  }, [gameNumber]);

  // showing congrats popup with score
  function showResult(messageKm, messageKmScore) {
    setPopupMessageClass("hiddenMessage"); // adding class attribute to make message invisible while on the screen 
    setPopupMessage(messageKm);
    setTimeout(() => {
      setPopupMessageClass("visibleMessage"); // adding class attribute to make it visible 
      setPopupMessage(messageKm);
    }, 1200);

    setTimeout(() => {
      setPopupMessage(messageKmScore);
    }, 3000);

    setTimeout(() => {
      setPopupMessage(null);
      // check the last round to show the gameSummary component
      if (turn === game.turns[2]) {
        setSummary(game);
      }

    }, 5000); // remove popup from the screen
  }

  function showError() {
    setErrorState("Error");
    setTimeout(() => {
      setErrorState(null);
    }, 3100);
  }

  //Function to allow for score to accumulate by making score state equal to previous score plus current score
  function calculateScore() {
    setTimeout(() => {
      setScore(score + turn.score);
    }, 5000); //Calculate cumulative score after 5 seconds (length of time it takes for pop up to disappear)
  }

  //Create a function that increments through array of turn objects and sets state to new turn object each time answer button is clicked
  const nextTurn = function() {
    if (position === null) {
      showError();
    }
    else {
      axios.put(`api/calculate/${turn.id}`, { questionLat: turn.latitude, questionLon: turn.longitude, answerLat: position.lat, answerLon: position.lng })
        .then(response => {
          showResult(`You are ${response.data.distanceKm}km away.`, `You are ${response.data.distanceKm}km away.\n Your score is ${response.data.score}.`);

          //remember turn result in the state to use in the gameSummary
          turn.score = response.data.score;
          turn.distanceKm = response.data.distanceKm;

          setTimeout(() => {
            setPosition(null);
          }, 5000);

          if (turn === game.turns[0]) {
            setTurn(game.turns[1]);
            calculateScore();

          }
          if (turn === game.turns[1]) {
            setTurn(game.turns[2]);
            calculateScore();

          } if (turn === game.turns[2]) {
            calculateScore();
          }
        });
    }
  };

  return {
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
  };
}
