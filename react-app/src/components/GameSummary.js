import Button from "../components/Button";
import "./GameSummary.css";
import { useNavigate } from "react-router-dom";
import AnswerMap from '../components/AnswerMap';



export default function GameSummary() {

  const navigate = useNavigate();

  const navigateToGame = function() {
    navigate('/game');
  };
  const navigateToHome = function() {
    navigate('/');
  };

  return (
    <>
      <div className="summary-container">
        {/* <AnswerMap className="summary-map" /> */}

        <div className="summary-results"> Here will be game results</div>

        <div className="summary-button-container">
          <Button className="button-summary" title={"Play Again"} onClick={navigateToGame} />
          <Button className="button-summary" title={"Main Menu"} onClick={navigateToHome} />
        </div>
      </div>
    </>
  );
}