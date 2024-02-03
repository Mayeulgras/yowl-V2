import {message} from "antd";
import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, Link } from "react-router-dom";
import SignIn from '../pages/signIn';
import profil from '../css/profil.css';
import axios from 'axios';
import { Settings, ArrowLeft } from 'react-feather'
import { removeToken,removeId,removeUsername, removeImg, removePrivacy } from '../helper';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/CGU">
        CGU
      </Link>
    </Menu.Item>
    <Menu.Item>
    <Link to="/Privacy">
        Privacy Policy
      </Link>
    </Menu.Item>
  </Menu>
);

const userId = localStorage.getItem('id')
const Profil = () => {
  const navigate = useNavigate();
const logout = () => {
  removeId('id');
  removeToken('authToken');
  removeUsername('username');
  removeImg('avatar');
  removePrivacy('privacyAccepted');
  navigate("/signIn");
  message.success(`Disconnected successfully!`);
  };
  const editProfil = () => {
    navigate("/infoPro");
    };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("No token found");
        }
      
        const response = await axios.get(`http://localhost:1337/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000000', minHeight: '100vh', padding: '50px 0' }}>
      <div style={{ position: 'absolute', top: '30px', right: '15px' }}>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <Settings color="white" /> <DownOutlined />
        </a>
      </Dropdown>
      </div>
      <h1 style={{ marginBottom: '20px', color:"white" }}>Your Profile</h1>
      {userData && (
        <div style={{ backgroundColor: '#000000', color: '#333', padding: '20px', borderRadius: '5px', width: '80%', margin: '20px auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s linear' }}>

          {userData.avatar_url ? (
            <img src={userData.avatar_url} alt="Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px', marginLeft: "25%"}} />
          ) : null}
          <p style={{ fontSize: "30px", color: "white", marginBottom: '0px', display: "block", textAlign: "center"}}><strong>{userData.username}</strong></p>
          <div style={{ display: 'flex', justifyContent: "center" }}>
            
            <button onClick={editProfil} style={{ backgroundColor: "#232323", color:"#ffffff", padding: "0 100px", fontSize: "14px", borderRadius: '50px', marginTop: "10%",  fontFamily: "Poppins", border: "none", paddingBottom: '5px', paddingTop: '5px', marginBottom : '30px'}}>Edit profile</button>
          </div>
          {/* <p style={{ fontSize: "20px", color: "white", marginBottom: '10px', display: "block", marginBottom: "15px" }}><strong>LinkedIn:</strong> {userData.linkedin_username}</p> */}
          <p style={{ fontSize: "17px", color: "white", marginBottom: '10px', display: "block",paddingTop: "20px" }}><strong>Mail: </strong>{userData.email}</p>
          <p style={{ fontSize: "17px", color: "white", display: "block", marginBottom: "15px", paddingBottom: "20px"  }}><strong>GitHub:</strong> {userData.github_username}</p>
          <p style={{ fontSize: "20px", color: "white", marginBottom: '10px', display: "block",backgroundColor:"#232323", padding: "15px",borderRadius:"15px", marginBottom: "50px"  }}><strong>Bio:</strong> {userData.about}</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={logout} style={{ alignContent: "center", backgroundColor: "#0f0f0f", color:"white", padding: "0 40px", fontSize: "14px", borderRadius: '50px', fontFamily: "Poppins", border: "none", paddingBottom: '5px', paddingTop: '5px' }}>Log out</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil; 

