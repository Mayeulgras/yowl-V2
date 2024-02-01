import React, { useState } from "react";
import axios from "axios";
import { refreshPage } from "./postHome";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
const MyForm = ({ userId }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [wordLink, setWordLink] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const username = localStorage.getItem('username');
  const avatar = localStorage.getItem('avatar');


  const onSubmit = async (e) => {
    e.preventDefault();
    try {

      const postData = new FormData();
      postData.append('data', JSON.stringify({ description, wordLink, link, user: username, av: avatar }));
      const postResponse = await axios.post("http://localhost:1337/api/posts", postData);
      console.log("POST request successful:", postResponse.data);
  
  
      const formData = new FormData();
      formData.append('files', image);
  
      const photoResponse = await axios.post(`http://localhost:1337/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log("Photo upload successful:", photoResponse.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
    refreshPage();
    navigate("/")

  };
  

  return (
    <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', backgroundColor: '#000000' }}>
      <h1 style={{ marginBottom: '20px', color: "white", fontFamily: 'Poppins' }}>Make a post !</h1>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{width: "80%", backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px', color:"white", fontsize: "22px"}} />
      <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" style={{width: "80%", backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px', color:"white", fontsize: "22px"}} />
      <input value={wordLink} onChange={(e) => setWordLink(e.target.value)} placeholder="Word for link" style={{width: "80%", backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px', color:"white", fontsize: "22px"}} />
      <input type="file" onChange={handleImageChange} required style={{width: "80%", backgroundColor: "#000000",border: "none", borderBottom: "1px solid", borderColor: "lightgrey", borderRadius:"0px", paddingTop: '67px', color:"white", fontsize: "22px"}}/>
      <button type="button" onClick={onSubmit} style={{ backgroundColor: "#ffffff", color:"black", padding: "0 80px", fontSize: "18px", borderRadius: '50px',marginTop: "40px", fontFamily: "Poppins" }}>Post</button>
    </form>
  );
};

export default MyForm;
