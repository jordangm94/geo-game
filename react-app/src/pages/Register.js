import RegisterForm from "../components/RegisterForm";

import "./Register.css";

export default function Register(props) {
  return (
    <div className="register-form">
      <h1>Register</h1>
      <RegisterForm setUser={props.setUser} />
    </div>
  );
}