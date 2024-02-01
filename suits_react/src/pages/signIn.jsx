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
  } from "antd";
  import React, { Fragment, useState } from "react";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { useAuthContext } from "../context/authContext";
  import useScreenSize from "../hooks/useScreenSize";
  import { API } from "../constant";
  import { setId, setImg, setToken, setUsername } from "../helper";
  import { createGlobalStyle } from "styled-components";

  const GlobalStyle = createGlobalStyle`
  .my-input::placeholder,
  .my-password-input::placeholder {
    color: white;
    font-size: 22px;
  }
  `;
  const SignIn = () => {

    const { isDesktopView } = useScreenSize();
    const navigate = useNavigate();
  
    const { setUser } = useAuthContext();
  
    const [isLoading, setIsLoading] = useState(false);
  
    const [error, setError] = useState("");
  
    const onFinish = async (values) => {
      setIsLoading(true);
      try {
        const value = {
          identifier: values.email,
          password: values.password,
        };
        const response = await fetch(`${API}/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
  
        const data = await response.json();
        if (data?.error) {
          throw data?.error;
        } else {
          setToken(data.jwt);
          setId(data.user.id);
          setUsername(data.user.username);
          setUser(data.user);
          setImg(data.user.avatar_url)
  
          message.success(`Welcome back ${data.user.username}!`);
  
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
              <h1 style={{ color:"white", fontFamily:"Poppins", fontSize:"32px", marginBottom: "0px"}}>Welcome Back !</h1>
            <p  subtitle="" style={{ color:"white", fontFamily:"Poppins", fontSize: "18px", paddingBottom: '137px'}}>Enter your information below</p>
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
                style={{height: "55.8vh", width: "40vh"}}
              >
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
                  <Input className="my-input" placeholder="Email address" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", color:"white", fontsize: "22px"}} />
                </Form.Item>
  
                <Form.Item
                  label=""
                  name="password"                  
                  rules={[{ required: true }]}
                >
                  <Input
                    className="my-password-input" 
                    type="password" 
                    placeholder="Password" 
                    style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", color:"white", paddingTop: '67px',fontsize:"22px"}}  
                  />
                </Form.Item>
  
                <Form.Item style={{ textAlign: "center"}}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_submit_btn"
                    style={{ backgroundColor: "#ffffff", color:"black", padding: "0 80px", fontSize: "18px", borderRadius: '50px', fontFamily: "Poppins" }}
                  >
                    {isLoading ? <Spin size="small" /> : "Connect"}
                  </Button>
                </Form.Item>
                <GlobalStyle />
              </Form>
              <Typography.Paragraph className="form_help_text"style={{ color: "white", textAlign: "center", fontSize: "15px", fontFamily: "Poppins" }}>
                Create a <Link to="/signup" style={{color: "white", textDecoration: "underline"}}>new account</Link>
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  };
  export default SignIn;