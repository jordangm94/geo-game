import React from "react";
import { Form, Button, Input } from "antd";


export default function RegisterForm() {
  return (
    <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
      <Form.Item name="user_name" label="Username">
        <Input placeholder="Type your username" />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input placeholder="Type your email" />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input.Password placeholder="Type your password" />
      </Form.Item>
      <Form.Item name="confirmPassword" label="Confirm Password">
        <Input.Password placeholder="Confirm your password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}