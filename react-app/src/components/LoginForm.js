import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Input } from "antd";

import "./LoginForm.css";

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
        props.setUser(response.data.user.user_name);
      }
    });
  };

  return (
    <>
      <section className="login_validation">{errorMessage}</section>
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
      </Form >
    </>
  );
}