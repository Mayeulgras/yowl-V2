import React from 'react';
import NavBar from '../components/navbar';
import ProfilPage from '../components/profilPage';

const userId = localStorage.getItem('id')

const Profil = () => {
  return (
    <div>
      <ProfilPage userId={userId}/>
      <NavBar />
    </div>
  );
};

export default Profil;