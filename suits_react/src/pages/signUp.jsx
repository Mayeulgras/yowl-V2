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
    Modal,
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

      const [acceptCGU, setAcceptCGU] = useState(false);

    const handleCheckboxChange = () => {
      setAcceptCGU(!acceptCGU);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
    };

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
                  <Input className="my-input" type="password" placeholder="Password" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px', color:"white", fontsize: "22px"}} />
                </Form.Item>

                <Form.Item
                  name="acceptCGU"
                  valuePropName="checked"
                  rules={[
                    { required: true, message: 'Please accept the CGU!' },
                  ]}
                >
                  <Checkbox 
                    style={{color: "white", paddingTop: '40px'}} 
                  >
                    <span style={{color: "white"}}>I accept the </span>
                    <Button type="link" onClick={showModal} style={{color: "lightblue", padding: 0}}>
                      CGU
                    </Button>
                  </Checkbox>
                </Form.Item>
                

                <Modal title="CGU" visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
                  <p>
                    1- Acceptance of Terms<br />
                    By using the Application, you agree to be bound by these CGU. If you do not accept these CGUs in their entirety, you are not authorized to use the Application.<br />
                    <br />
                    2- Description of the Application<br />
                    The Application is designed to enable users to publish business information and exchange ideas in a professional context. It offers features such as message publishing and user profile creation.<br />
                    <br />
                    3- Registration and user account<br />
                    To use certain features of the Application, you will need to create a user account. You agree to provide accurate, complete and up-to-date information when registering, and to maintain the security of your account. You are solely responsible for all activities that occur under your account.<br />
                    <br />
                    4- Permitted use<br />
                    You agree to use the Application in accordance with all applicable laws, rules and regulations. You agree not to use the Application for any purpose that is unlawful or prohibited by these CGU.<br />
                    <br />
                    5- User Content<br />
                    You are solely responsible for any content you publish on the Application. By posting content, you warrant that you have the right to do so and that such content does not infringe any third party rights.<br />
                    <br />
                    6- Intellectual property rights<br />
                    All intellectual property rights in the Application and its content (except user content) are owned by SUIT or its licensors. No right, title or interest in any such intellectual property rights is transferred to you.<br />
                    <br />
                    7- Limitation of liability<br />
                    To the fullest extent permitted by applicable law, SUIT disclaims all liability for any direct, indirect, incidental, special, consequential or exemplary damages resulting from the use of the Application or any content available on the Application.<br />
                    <br />
                    8- Modifications to the GCU<br />
                    We reserve the right to modify these CGU at any time. Modifications will take effect as soon as they are published on the Application. We encourage you to review the CGU regularly to ensure that you understand the terms and conditions that apply to your use of the Application.<br />
                    <br />
                    9- Applicable law and jurisdiction<br />
                    These CGU shall be governed by and construed in accordance with the laws of France. Any dispute arising out of or in connection with these CGU shall be subject to the exclusive jurisdiction of the courts of Paris, France.<br />
                    <br />
                    By using the Application, you agree to be bound by these CGU. If you have any questions about these CGUs, please contact us at suit@gmail.com.

                    Done at Paris, on 29/01/2024.
                  </p>
                </Modal>
  
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