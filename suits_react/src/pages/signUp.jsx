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
  import { createGlobalStyle } from "styled-components";


  const GlobalStyle = createGlobalStyle`
  .my-input::placeholder,
  .my-password-input::placeholder {
    color: white;
    font-size: 22px;
  }
  `;
  
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
            <Card style={{ background: "#000000", paddingTop: "50px"}} headStyle={{color: "White"}}>
            <h1 style={{ color:"white", fontFamily:"Poppins", fontSize:"32px", marginBottom: "0px"}}>Create an account !</h1>
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
                style={{height: "78vh", width: "40vh"}}
              >
                <Form.Item
                  label=""
                  name="username"
                  rules={[
                    {
                      required: true,
                      type: "string",
                    },
                  ]}
                >
                  <Input className="my-input" placeholder="Username" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px',  color:"white", fontsize: "22px"}} />
                </Form.Item>
                <Form.Item
                  label=""
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                >
                  <Input className="my-input" placeholder="Email address" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px', color:"white", fontsize: "22px"}}/>
                </Form.Item>
  
                <Form.Item
                  label=""
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 12, message: 'Password must be at least 12 characters.' },
                    { pattern: /[A-Z]/, message: 'Password must contain an uppercase letter.' },
                    { pattern: /[0-9]/, message: 'Password must contain a number.' },
                    { pattern: /[^A-Za-z0-9]/, message: 'Password must contain a special character.' },
                  ]}
                >
                  <Input className="my-input" placeholder="Password" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px', color:"white", fontsize: "22px"}} />
                </Form.Item>

                <Form.Item
                  name="acceptCGU"
                  valuePropName="checked"
                  rules={[
                      { required: true, message: 'Please accept the CGU!' },
                  ]}
                >
                  <Checkbox style={{color: "white", paddingTop: '40px'}}>I accept the CGU</Checkbox>
                </Form.Item>
  
                <Form.Item style={{ textAlign: "center"}}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_submit_btn"
                    style={{ backgroundColor: "#ffffff", color:"black", padding: "0 80px", fontSize: "18px", borderRadius: '50px', fontFamily: "Poppins" }}
                  >
                    Register {isLoading && <Spin size="small" />}
                  </Button>
                </Form.Item>
                <GlobalStyle />
              </Form>
              <Typography.Paragraph className="form_help_text"style={{ color: "white", textAlign: "center", fontSize: "15px", fontFamily: "Poppins" }}>
                Already have an account ? <Link to="/signIn" style={{color: "white", textDecoration: "underline"}}>Click here</Link>
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  };
  
  export default SignUp;