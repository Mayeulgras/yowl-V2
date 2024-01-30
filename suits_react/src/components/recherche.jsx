import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './profile'; // Importez le composant Profile

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Effectuez une requête HTTP pour récupérer tous les profils (ou initialisez les profils autrement)
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

  // Fonction pour filtrer les profils en fonction du terme de recherche
  const filteredProfiles = profiles.filter(profile =>
    profile.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Search Profiles</h1>
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div>
        {searchTerm && filteredProfiles.map(profile => (
          <Profile key={profile.id} profileData={profile} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
