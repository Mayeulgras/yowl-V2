import React from 'react';
import { createGlobalStyle } from 'styled-components';


const windowDimension = window.innerWidth;
const isMobile = windowDimension <= 640;

const TopBar = () => {
  return (
    <>
    <CSSReset />
      {isMobile ? (
        <div className="top-bar">
          <div className="brand">
            <p style={{fontFamily: "PoppinsExtra", }}>SUITS</p>
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
