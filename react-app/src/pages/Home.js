import TitleDescription from "../components/Home/TitleDescription";
import Video from "../components/Home/Video";
import Button from "../components/Button";
import "./Home.css"
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate()
  
  const navigateToGame = function() {
    console.log("Click function navigate to game")
    navigate('/game');
  };

  return (
    <>
    <TitleDescription />
    <Video />
    <Button className={"button-home-playnow"} title={"Play Now"} onClick={navigateToGame} />
    </>
  );
}