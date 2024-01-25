import React, { useState } from "react";
import axios from "axios";

const MyForm = () => {
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('files', image); // Strapi utilise 'files' pour les uploads de fichiers
      formData.append('data', JSON.stringify({ description, link })); // Les autres données doivent être stringifiées
  
      const response = await axios.post("http://localhost:1337/api/posts", {
        data: {
          description: description,
          link: link,
        },
      });
      console.log("POST request successful:", response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <form>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      <input type="file" onChange={handleImageChange} />
      <button type="button" onClick={onSubmit}>Submit</button>
    </form>
  );
};

export default MyForm;
