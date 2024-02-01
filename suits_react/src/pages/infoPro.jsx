import React from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext } from "../context/authContext";
import { API } from "../constant";
import { useState } from "react";
import { getToken } from "../helper";
import { createGlobalStyle } from "styled-components";
import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  .my-input::placeholder,
  .my-password-input::placeholder {
    color: white;
    font-size: 22px;
  }
  `;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      setUser(responseData);
      message.success("Data saved successfully!");
    } catch (error) {
      console.error(Error);
      message.error("Error While Updating the Profil!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Card style={{ background: "#000000", paddingTop: "50px"}} headStyle={{color: "White"}}>
      <Link to="/profil">
      <ArrowLeft style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }} />
      </Link>
        <h1 style={{ color:"white", fontFamily:"Poppins", fontSize:"32px", marginBottom: "0px"}}>Custom your profile !</h1>
      <Form
        layout="vertical"
        style={{height: "81.6vh", width: "40vh"}}
        initialValues={{
          username: user?.username,
          email: user?.email,
          linkedin_username: user?.linkedin_username,
          github_username: user?.github_username,
          website_url: user?.website_url,
          about: user?.about,
        }}
        onFinish={handleProfileUpdate}
      >
        <Row gutter={[16, 16]}>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label=""
              name="username"
              rules={[
                {
                  required: true,
                  message: "Username is required!",
                  type: "string",
                },
              ]}
            >
              <Input className="my-input" placeholder="Username" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px', color:"white", fontsize: "22px"}} />
            </Form.Item>
          </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label=""
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                  type: "email",
                },
              ]}
            >
              <Input className="my-input" placeholder="Email address" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '30px', color:"white", fontsize: "22px"}} />
            </Form.Item>
          </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label=""
              name="avatar_url"
              rules={[
                {
                  type: "url",
                },
              ]}
            >
                <Input className="my-input" placeholder="Avatar Url" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '30px', color:"white", fontsize: "22px"}} />
            </Form.Item>
          </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label=""
              name="about"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input className="my-input" placeholder="Bio" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '30px', color:"white", fontsize: "22px"}} />
            </Form.Item>
          </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label=""
              name="linkedIn_username"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input className="my-input" placeholder="Linkedin Username" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '30px', color:"white", fontsize: "22px"}} />
            </Form.Item>
          </Col>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label=""
              name="github_username"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input className="my-input" placeholder="Github Username" style={{backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '30px', color:"white", fontsize: "22px"}} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "center"}}>
        <Button
          className="profile_save_btn"
          htmlType="submit"
          type="primary"
          size="large"
          style={{ backgroundColor: "#ffffff", color:"black", padding: "0 80px", fontSize: "18px", borderRadius: '50px', fontFamily: "Poppins" }}
        >
          {loading ? (
            <>
              <Spin size="small" /> Saving
            </>
          ) : (
            "Save"
          )}
        </Button>
        </Form.Item>
        <GlobalStyle />
      </Form>
    </Card>
  );
};

export default Profile;