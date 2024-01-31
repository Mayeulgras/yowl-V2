import {message} from "antd";
import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import SignIn from '../pages/signIn';
import profil from '../css/profil.css';
import axios from 'axios';
import { removeToken,removeId,removeUsername } from '../helper';


const userId = localStorage.getItem('id')
const Profil = () => {
  const navigate = useNavigate();
const logout = () => {
  removeId('id');
  removeToken('authToken');
  removeUsername('username');
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
      <h1 style={{ marginBottom: '20px', color:"white" }}>User Profile</h1>
      {userData && (
        <div style={{ backgroundColor: '#ffffff', color: '#333', padding: '20px', borderRadius: '5px', width: '80%', margin: '20px auto', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s linear' }}>
          <p style={{ marginBottom: '10px' }}><strong>Username:</strong> {userData.username}</p>
          <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {userData.email}</p>
          <p style={{ marginBottom: '10px' }}><strong>Website URL:</strong> {userData.website_url}</p>
          <p style={{ marginBottom: '10px' }}><strong>LinkedIn:</strong> {userData.linkedin_username}</p>
          <p style={{ marginBottom: '10px' }}><strong>Bio:</strong> {userData.about}</p>
          <button onClick={logout} style={{ margin: '10px', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>Disconnect</button>
          <button onClick={editProfil} style={{ margin: '10px', padding: '10px', backgroundColor: '#808080', color: 'white', border: 'none', borderRadius: '5px' }}>Edit profil</button>
        </div>
      )}
    </div>
  );
};

export default Profil; 

