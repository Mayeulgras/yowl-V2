import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Post from './pages/post';
import Profil from './pages/profil';
import Search from './pages/search';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';

const App = () => {
  return (
      <Routes>
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/search" element={<Search />} />
      {/* Other routes */}
      </Routes>
  );
};

export default App;
