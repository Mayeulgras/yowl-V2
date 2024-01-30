import React, { useState, useEffect } from 'react';
import profil from '../css/profil.css';
import axios from 'axios';

const userId = localStorage.getItem('id')
const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer le token JWT depuis le stockage local
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("No token found");
        }
        
        // Envoyer une requête HTTP pour récupérer les informations de l'utilisateur
        const response = await axios.get(`http://localhost:1337/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Mettre à jour l'état avec les données de l'utilisateur récupérées
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {userData && (
        <div className="profile-info">
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Website URL:</strong> {userData.website_url}</p>
          <p><strong>LinkedIn:</strong> {userData.linkedin_username}</p>
          <p><strong>Bio:</strong> {userData.about}</p>
          {/* Afficher d'autres informations de l'utilisateur ici */}
        </div>
      )}
    </div>
  );
};

export default Profile; 

