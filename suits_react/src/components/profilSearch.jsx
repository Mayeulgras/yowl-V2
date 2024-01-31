import React from 'react';

const Profile = ({ profileData }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      color: 'black',
      padding: '20px',
      borderRadius: '5px',
      width: '80%',
      margin: '20px auto',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s linear'
    }}>
      <p style={{ marginBottom: '10px' }}><strong>Nom:</strong> {profileData.username}</p>
      <p style={{ marginBottom: '10px' }}><strong>Email:</strong> {profileData.email}</p>
    </div>
  );
};

export default Profile;
