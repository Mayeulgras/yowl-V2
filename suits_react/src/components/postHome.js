import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Heart, Bookmark } from 'react-feather';


function Post() {
    const [posts, setPosts] = useState([]);
    const [files, setFiles] = useState([]);
    const [heartLogoColor, setHeartLogoColor] = useState("#ffffff");
    const [bookmarkLogoColor, setBookmarkLogoColor] = useState("#ffffff");

    const handleHeartLogoClick = () => {
        setHeartLogoColor("#FF0000");
      };

    const handleBookmarkLogoClick = () => {
        setBookmarkLogoColor("#FFFF00");
    };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts depuis Strapi:", error);
      }
    };

    const fetchFiles = async () => {
        try {
          const filesResponse = await fetch("http://localhost:1337/api/upload/files");
          const filesData = await filesResponse.json();
          setFiles(filesData);
        } catch (error) {
          console.error("Erreur lors de la récupération des fichiers depuis Strapi:", error);
        }
      };

    fetchPosts();
    fetchFiles();
  }, []);   

  return (
    <>
      <Style />
      <div>
        <div className="ul">
          {Array.isArray(posts.data) && posts.data.map((post) => {
            const matchingFile = files.find(file => file.id === post.id);
  
            return (
              <div key={post.id}>
                <div style={{ borderBlockEnd: '1px solid #ccc', marginBottom: '10px', padding: '10px', backgroundColor: 'black' }}>
                  {matchingFile && (
                    <img src={`http://localhost:1337${matchingFile.formats.thumbnail.url}`} alt={post.attributes.description} style={{ maxWidth: '100%' }} />
                  )}
                  <p>{post.attributes.description}</p>
                  <a href={post.attributes.link} target="_blank" rel="noopener noreferrer" style={{ color: 'grey' }}>
                    {post.attributes.link}
                  </a>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div>
                    <Heart onClick={handleHeartLogoClick} color="#FF0000" size={16} fill={heartLogoColor} /> {/* Icone Like */}
                    <Bookmark onClick={handleBookmarkLogoClick} size={16} fill={bookmarkLogoColor} /> {/* Icone Like */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const Style = createGlobalStyle`
.ul {
    background-color: black;
    list-style-type: disc;
    margin-block-start: 66px;
    overflow: hidden; 
  }
  
p {
    color: white;
  }


`;


export default Post;
