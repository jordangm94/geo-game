import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Input } from "antd";

import "./RegisterForm.css";


export default function RegisterForm() {
  const [usernameRegister, setUsernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const register = () => {
    axios.post('api/register', {
      username: usernameRegister,
      email: emailRegister,
      password: passwordRegister
    }).then(response => console.log(response));
  };

  return (
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
    </Form >
  );
}