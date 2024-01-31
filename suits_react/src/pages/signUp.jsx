import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Row,
    Spin,
    Typography,
    Checkbox,
  } from "antd";
  import React, { Fragment, useState } from "react";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { useAuthContext } from "../context/authContext";
  import useScreenSize from "../hooks/useScreenSize";
  import { API } from "../constant";
  import { setId, setToken, setUsername } from "../helper";

  
  const SignUp = () => {
    const { isDesktopView } = useScreenSize();
    const navigate = useNavigate();
  
    const { setUser } = useAuthContext();
  
    const [isLoading, setIsLoading] = useState(false);
  
    const [error, setError] = useState("");
  
    const onFinish = async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API}/auth/local/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        const data = await response.json();
        if (data?.error) {
          throw data?.error;
        } else {
          // set the token
          setToken(data.jwt);
          setId(data.user.id);
          setUsername(data.user.username);
  
          // set the user
          setUser(data.user);
  
          message.success(`Welcome to Suits ${data.user.username}!`);
  
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error(error);
        setError(error?.message ?? "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Fragment>
        <Row align="middle">
          <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
            <Card title="Sign up">
              {error ? (
                <Alert
                  className="alert_error"
                  message={error}
                  type="error"
                  closable
                  afterClose={() => setError("")}
                />
              ) : null}
              <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      type: "string",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="Email address" />
                </Form.Item>
  
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 12, message: 'Password must be at least 12 characters.' },
                    { pattern: /[A-Z]/, message: 'Password must contain an uppercase letter.' },
                    { pattern: /[0-9]/, message: 'Password must contain a number.' },
                    { pattern: /[^A-Za-z0-9]/, message: 'Password must contain a special character.' },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="acceptCGU"
                  valuePropName="checked"
                  rules={[
                      { required: true, message: 'Please accept the CGU!' },
                  ]}
                >
                  <Checkbox>Accept the CGU</Checkbox>
                </Form.Item>
  
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_submit_btn"
                  >
                    Submit {isLoading && <Spin size="small" />}
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph className="form_help_text">
                Already have an account? <Link to="/signIn">Sign In</Link>
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  };
  
  export default SignUp;