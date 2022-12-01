

export default function Popup(props) {

  return (<div className="null-position-popup-container">
    <span className={props.messageClass}>{props.message}</span>
  </div>);
}