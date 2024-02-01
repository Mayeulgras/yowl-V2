import React from 'react';

const Profile = ({ profileData }) => {
  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      width: '80%',
      margin: '5px auto 5px 0', // Réduire la marge à droite
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.3s linear',
      display: 'flex', // Ajout de Flexbox
      alignItems: 'center' // Centrer les éléments verticalement
    }}>
      <img src={profileData.avatar_url} style={{ width: '70px', borderRadius: '50%', marginRight: '20px' }} />
      <div>
        <p style={{ marginBottom: '10px' }}>{profileData.username}</p>
        <p style={{ marginBottom: '10px' }}>{profileData.email}</p>
      </div>
    </div>
  );
};

export default Profile;