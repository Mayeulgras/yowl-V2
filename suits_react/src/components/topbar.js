import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { LogIn } from "react-feather";



const windowDimension = window.innerWidth;
const isMobile = windowDimension <= 640;

const TopBar = () => {
  return (
    <>
    <CSSReset />
      {isMobile ? (
        <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="brand">
            <p style={{fontFamily: "PoppinsExtra", }}>SUITS</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{marginLeft: "-20%", marginTop: "6%", marginRight: "20%"}}>No account ?</p>
          <Link to="/signIn">
          <LogIn style={{marginLeft: "-55%", marginTop: "8%", color: "white"}}/>
          </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};
const CSSReset = createGlobalStyle`
body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }

  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #000000;
    color: #fff;
    padding-top: 20px;
    padding-left: 10px;
    display: flex;
    justify-content: left;
    z-index: 1000;
  }

  .brand {
    display: flex;
    align-items: center;
  }

  .brand p {
    margin: 0;
    font-size: 32px;
    font-weight: 900;
    color: #ffffff;
  }
`;

export default TopBar;
