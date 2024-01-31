import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './profilSearch';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/users');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);
  const filteredProfiles = profiles.filter(profile =>
    profile.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000000', minHeight: '100vh', padding: '50px 0' }}>
      <h1 style={{ marginBottom: '20px', color: "white", fontFamily: 'Poppins' }}>Search Profiles</h1>
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          width: '80%',
          maxWidth: '500px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '20px'
        }}
      />
      <div style={{ width: '80%', maxWidth: '500px' }}>
        {searchTerm && filteredProfiles.map(profile => (
          <Profile key={profile.id} profileData={profile} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
