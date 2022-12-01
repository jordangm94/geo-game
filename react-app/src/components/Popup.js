import "./Popup.css";

import Background_Video_Pexels from './fireworks.mp4';

export default function Popup(props) {

  return (<div className="popupContainer">
    <span className={props.messageClass}>{props.message}</span>
    <video className="popupBackground" src={Background_Video_Pexels} autoPlay loop muted />
  </div>);
}


