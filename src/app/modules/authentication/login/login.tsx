import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { Link } from "react-router";
import { authenticationRoutePath } from "../authentication.routes";
import type { LoginPayload } from "../authentication.model";

const Login: React.FC = () => {
  const onFinish = (values: LoginPayload) => {};

  return (
    <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item<LoginPayload>
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Enter your email"
          variant="filled"
          className="py-2! border! border-gray-300!"
        />
      </Form.Item>
      <Form.Item<LoginPayload>
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Enter your password"
          variant="filled"
          className="py-2! border! border-gray-300!"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link
            to={authenticationRoutePath.FORGET_PASSWORD}
            className="text-primary!"
          >
            Forgot password
          </Link>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          className="py-5! text-lg!"
        >
          Log in
        </Button>
        <p className="mt-2 text-gray-300 text-sm">
          Don't have an account on faradah?
          <Link
            to={authenticationRoutePath.REGISTER}
            className="text-primary! font-semibold"
          >
            Create a new account
          </Link>
        </p>
      </Form.Item>
    </Form>
  );
};

export default Login;
