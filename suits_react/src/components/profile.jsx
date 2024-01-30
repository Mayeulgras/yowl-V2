import React from 'react';

const Profile = ({ profileData }) => {
  return (
    <div style={{ backgroundColor: '#282c34', padding: '20px', borderRadius: '5px', width: '80%', margin: '20px auto' }}>
      <p><strong>Nom:</strong> {profileData.username}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
    </div>
  );
};

export default Profile;
