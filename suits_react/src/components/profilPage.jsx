import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = ({Id}) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Faire une requête HTTP pour récupérer les données du profil en fonction de l'ID du compte depuis Strapi
    axios.get(`http://localhost:1337/api/users/${Id}`)
      .then(response => {
        // Supposons que la réponse renvoie un tableau de profils correspondant à l'ID du compte
        if (response.data) {
          setProfileData(response.data);
        } else {
          console.error(`Aucun profil trouvé pour le compte avec l'ID ${Id}`);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données du profil : ', error);
      });
  }, [Id]);

  return (
    <div>
      <h1>Page de profil</h1>
      {profileData && (
        <div>
          <p>Nom: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          {/* Afficher d'autres informations du profil ici */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
