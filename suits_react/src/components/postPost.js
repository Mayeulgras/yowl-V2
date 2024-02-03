import React, { useState } from "react";
import axios from "axios";
import { refreshPage } from "./postHome";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getToken } from "../helper";
import { Alert } from "antd";

const MyForm = ({ userId }) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [description, setDescription] = useState("");
  const [wordLink, setWordLink] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState('');
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");

  const onSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("No token found in localStorage. Cannot make a post.");
      setShowAlert(true);
      return;
    }

    try {
      const postData = new FormData();
      postData.append('files.image', image);
      postData.append('data', JSON.stringify({
        description,
        wordLink,
        link,
        user: username,
        av: avatar,
      }));
  
      const postResponse = await fetch('http://localhost:1337/api/posts?populate=*', {
        method: 'POST',
        body: postData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await postResponse.json();
      console.log("POST request successful:", responseData);
    } catch (error) {
      console.error("Error making POST request:", error);
      setShowAlert(true);
    }
    navigate("/");
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#000000",
      }}
    >
      
      <h1
        style={{ marginBottom: "20px", color: "white", fontFamily: "Poppins" }}
      >
        Make a post !
      </h1>
      {showAlert && <Alert message="You're not connected !" type="error" />}

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        style={{
          width: "80%",
          backgroundColor: "#000000",
          border: "none",
          borderBottom: "1px solid",
          borderColor: "lightgrey",
          borderRadius: "0px",
          paddingTop: "67px",
          color: "white",
          fontsize: "22px",
        }}
      />
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link"
        style={{
          width: "80%",
          backgroundColor: "#000000",
          border: "none",
          borderBottom: "1px solid",
          borderColor: "lightgrey",
          borderRadius: "0px",
          paddingTop: "67px",
          color: "white",
          fontsize: "22px",
        }}
      />
      <input
        value={wordLink}
        onChange={(e) => setWordLink(e.target.value)}
        placeholder="Word for link"
        style={{
          width: "80%",
          backgroundColor: "#000000",
          border: "none",
          borderBottom: "1px solid",
          borderColor: "lightgrey",
          borderRadius: "0px",
          paddingTop: "67px",
          color: "white",
          fontsize: "22px",
        }}
      />
      <input
        type="file"
        onChange={handleImageChange}
        required
        style={{
          width: "80%",
          backgroundColor: "#000000",
          border: "none",
          borderBottom: "1px solid",
          borderColor: "lightgrey",
          borderRadius: "0px",
          paddingTop: "67px",
          color: "white",
          fontsize: "22px",
        }}
      />
      <button
        type="button"
        onClick={onSubmit}
        style={{
          backgroundColor: "#ffffff",
          color: "black",
          padding: "0 80px",
          fontSize: "18px",
          borderRadius: "50px",
          marginTop: "40px",
          fontFamily: "Poppins",
        }}
      >
        Post
      </button>
    </form>
  );
};

export default MyForm;
