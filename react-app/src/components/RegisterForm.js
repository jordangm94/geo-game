import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Input } from "antd";

import "./RegisterForm.css";
import { RiErrorWarningLine } from "react-icons/ri";


export default function RegisterForm(props) {
  const [usernameRegister, setUsernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const register = () => {
    axios.post('api/register', {
      username: usernameRegister,
      email: emailRegister,
      password: passwordRegister
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
        onFinish={register}
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <Form.Item name="user_name"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please enter a username"
            },
            {
              whitespace: true,
              message: "Please enter a username"
            },
            {
              min: 6,
              message: "Username must be at least 6 characters"
            }
          ]}
          hasFeedback
        >
          <Input placeholder="Type your username" onChange={e => setUsernameRegister(e.target.value)} />
        </Form.Item>
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
          <Input placeholder="Type your email" onChange={e => setEmailRegister(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please enter a password"
            },
            {
              min: 8,
              message: "Password must be at least 8 characters"
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Type your password" onChange={e => setPasswordRegister(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: "Please confirm your password"
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The password confirmation does not match");
              }
            })
          ]}
          hasFeedback>
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>
        <div className="register-submit">
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </div>
        {
          errorMessage &&
          <div className="register-validation">
            <RiErrorWarningLine />
            <h4>{errorMessage}</h4>
          </div>
        }
        <div className="redirect-login">
          <h4>Already have an account? <a href="/login">Log In</a></h4>
        </div>
      </Form >
    </>
  );
}