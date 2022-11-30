import LoginForm from "../components/LoginForm";

import "./Login.css";

export default function Login(props) {
  return (
    <div className="login-form">
      <h1>Log In</h1>
      <LoginForm setUser={props.setUser} />
    </div>
  );
}