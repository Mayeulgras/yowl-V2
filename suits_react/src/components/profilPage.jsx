import {message} from "antd";
import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, Link } from "react-router-dom";
import SignIn from '../pages/signIn';
import profil from '../css/profil.css';
import axios from 'axios';
import { Settings, ArrowLeft } from 'react-feather'
import { removeToken,removeId,removeUsername, removeImg } from '../helper';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/params">
        CGU
      </Link>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Option 2
      </a>
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
      <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          <Settings color="white" /> <DownOutlined />
        </a>
      </Dropdown>
      </div>
      <h1 style={{ marginBottom: '20px', color:"white" }}>Your Profile</h1>
      {userData && (
        <div style={{ backgroundColor: '#000000', color: '#333', padding: '20px', borderRadius: '5px', width: '80%', margin: '20px auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s linear' }}>
          <img src={userData.avatar_url} alt="Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px', marginLeft: "25%" }} />
          <p style={{ fontSize: "20px", color: "white", marginBottom: '10px' }}><strong>Username:</strong> {userData.username}</p>
          <p style={{ fontSize: "20px", color: "white", marginBottom: '10px' }}><strong>Email:</strong> {userData.email}</p>
          <p style={{ fontSize: "20px", color: "white", marginBottom: '10px' }}><strong>LinkedIn:</strong> {userData.linkedin_username}</p>
          <p style={{ fontSize: "20px", color: "white", marginBottom: '10px' }}><strong>GitHub:</strong> {userData.github_username}</p>
          <p style={{ fontSize: "20px", color: "white", marginBottom: '10px' }}><strong>Bio:</strong> {userData.about}</p>
          <button onClick={editProfil} style={{ backgroundColor: "#ffffff", color:"black", padding: "0 80px", fontSize: "18px", borderRadius: '50px',marginTop: "10%",  fontFamily: "Poppins" }}>Edit profil</button>
          <button onClick={logout} style={{ backgroundColor: "red", color:"black", padding: "0 80px", fontSize: "18px", borderRadius: '50px', marginTop: "80%", marginRight: "20%",  fontFamily: "Poppins" }}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default Profil; 

