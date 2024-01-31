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
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ margin: '10px', padding: '10px', width: '80%', backgroundColor: '#fff', color: '#333', borderBottom: '1px solid #ccc', borderRadius: '10px', fontSize: '1.2em' }} />
      <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" style={{ margin: '10px', padding: '10px', width: '80%', backgroundColor: '#fff', color: '#333', borderBottom: '1px solid #ccc', borderRadius: '10px', fontSize: '1.2em' }} />
      <input value={wordLink} onChange={(e) => setWordLink(e.target.value)} placeholder="Word for link" style={{ margin: '10px', padding: '10px', width: '80%', backgroundColor: '#fff', color: '#333', borderBottom: '1px solid #ccc', borderRadius: '10px', fontSize: '1.2em' }} />
      <input type="file" onChange={handleImageChange} required style={{ margin: '10px', color: '#333', backgroundColor: '#fff', borderBottom: '1px solid #ccc', borderRadius: '10px', fontSize: '1.2em' }}/>
      <button type="button" onClick={onSubmit} style={{ margin: '10px', padding: '10px', width: '80%', backgroundColor: '#808080', color: 'white', border: 'none', borderRadius: '5px' }}>Post</button>
    </form>
  );
};

export default MyForm;
