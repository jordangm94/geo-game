import "./Button.css";

//This button component will be used as the play now button on home, as well as answer button on answer map

export default function Button(props) {

  return (<button className={props.className} onClick={props.onClick}>{props.title}</button>);
}