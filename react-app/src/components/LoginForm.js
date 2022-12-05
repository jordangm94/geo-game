import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Input } from "antd";

import "./LoginForm.css";
import { RiErrorWarningLine } from "react-icons/ri";

export default function LoginForm(props) {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const login = () => {
    axios.post('api/login', {
      email: emailLogin,
      password: passwordLogin
    }).then(response => {
      if (response.data.error) {
        setErrorMessage(response.data.message);
      } else {
        navigate("/");
        localStorage.setItem('user', response.data.user.user_name);
        localStorage.setItem('userID', response.data.user.id);
        props.setUser(response.data.user.user_name);
        props.setUserID(response.data.user.id);
        setErrorMessage(null);
      }
    });
  };

  return (
    <>
      <Form
        layout="vertical"
        autoComplete="off"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={login}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter an email"
            },
            {
              type: "email",
              message: "Please enter a valid email"
            }
          ]}
          hasFeedback
        >
          <Input placeholder="Type your email" onChange={e => setEmailLogin(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please enter a password"
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Type your password" onChange={e => setPasswordLogin(e.target.value)} />
        </Form.Item>
        <div className="login-submit">
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </div>
        {
          errorMessage &&
          <div className="login-validation">
            <RiErrorWarningLine />
            <h4>{errorMessage}</h4>
          </div>
        }
        <div className="redirect-register">
          <h4>Don't have an account? <a href="/register">Register</a></h4>
        </div>
      </Form >
    </>
  );
}