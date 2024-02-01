import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Home, PlusCircle, Search, User } from "react-feather";
import { Link } from 'react-router-dom';

function useBarNav() {
  const [windowDimension, setWindowDimension] = useState(null);
  const [homeLogoColor, setHomeLogoColor] = useState("#808080");
  const [plusLogoColor, setPlusLogoColor] = useState("#808080");
  const [searchLogoColor, setSearchLogoColor] = useState("#808080");
  const [profileLogoColor, setProfileLogoColor] = useState("#808080");
  
  const handleHomeLogoClick = () => {
    setHomeLogoColor("#ffffff");
  };
  
  const handlePlusLogoClick = () => {
    setPlusLogoColor("#ffffff");
  };
  
  const handleSearchLogoClick = () => {
    setSearchLogoColor("#ffffff");
  };

  const handleProfileLogoClick = () => {
    setProfileLogoColor("#ffffff");
  };

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  return (
    <Styles.Wrapper>
      <CSSReset />

      {isMobile ? (
        <MobileNavbar.Wrapper>
          <MobileNavbar.Items>
            <MobileNavbar.Item>
            <Link to="/">
              <MobileNavbar.Icon>
                <Home onClick={handleHomeLogoClick} color={homeLogoColor} size={24} />
              </MobileNavbar.Icon>

              </Link>
            </MobileNavbar.Item>
            <MobileNavbar.Item>
            <Link to="/search">
              <MobileNavbar.Icon>
                <Search onClick={handleSearchLogoClick} color={searchLogoColor} size={24} />
              </MobileNavbar.Icon>
              
            </Link>
            </MobileNavbar.Item>
            <MobileNavbar.Item>
            <Link to="/post">
              <MobileNavbar.Icon>
                <PlusCircle onClick={handlePlusLogoClick} color={plusLogoColor} size={24} />
              </MobileNavbar.Icon>
              </Link>
            </MobileNavbar.Item>
            <MobileNavbar.Item>
            <Link to="/profil">
              <MobileNavbar.Icon>
                <User onClick={handleProfileLogoClick} color={profileLogoColor} size={24} />
              </MobileNavbar.Icon>
              
            </Link>
            </MobileNavbar.Item>
          </MobileNavbar.Items>
        </MobileNavbar.Wrapper>
      ) : (
        <Navbar.Wrapper>
          <Navbar.Logo>Logo</Navbar.Logo>
          <Navbar.Items>
            <Navbar.Item>Home</Navbar.Item>
            <Navbar.Item>Blog</Navbar.Item>
            <Navbar.Item>About</Navbar.Item>
          </Navbar.Items>
        </Navbar.Wrapper>
      )}
    </Styles.Wrapper>
  );
}

const Styles = {
  Wrapper: styled.main`
    display: flex;
    background-color: #000000;
    height: 0vh;
   
  `
};

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 1rem 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: black;
  `,
  Logo: styled.h1`
    border: 1px solid white;
    padding: 0.5rem 1rem;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;
  `
};

const MobileNavbar = {
  Wrapper: styled(Navbar.Wrapper)`
    position: fixed;
    width: 100vw;
    bottom: 0;
    
    justify-content: center;
  `,
  Items: styled(Navbar.Items)`
    flex: 1;
    padding: 0 2rem;

    justify-content: space-around;
  `,
  Item: styled(Navbar.Item)`
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1.2rem;
  `,
  Icon: styled.span``
};

const CSSReset = createGlobalStyle`
  *,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;      
  }  

  body {
    font-size: 1.4rem;
    font-family: Poppins, sans-serif;
  }
`;

export default useBarNav;