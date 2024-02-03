import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Post from './pages/post';
import Profil from './pages/profil';
import Search from './pages/search';
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import InfoPro from './pages/infoPro';
import CGU from './pages/CGU';
import Privacy from './pages/Privacy';

const App = () => {
  return (
      <Routes>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/infoPro" element={<InfoPro />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/search" element={<Search />} />
      <Route path="/CGU" element={<CGU />} />
      <Route path="/Privacy" element={<Privacy />} />
      </Routes>
          // <Layout>
          //   <Row gutter={[0, 32]}>
          //     <Col span={24}>
          //       <Header>
          //         <AppHeader />
          //       </Header>
          //     </Col>
          //     <Col span={22} offset={1}>
          //       <Content>
          //         <AppRoutes />
          //       </Content>
          //     </Col>
          //   </Row>
          // </Layout>
        );
      };
export default App;