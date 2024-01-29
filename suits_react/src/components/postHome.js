import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Heart, Bookmark, X } from 'react-feather';


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

    const handleDeleteTweet = async (postId) => {
        try {
            const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log(`Tweet with ID ${postId} deleted successfully.`);
            } else {
                console.error("Failed to delete tweet.");
            }
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
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
    <div style={{backgroundColor: 'black', marginTop: '15.2%'}}>
      {Array.isArray(posts.data) && posts.data.map((post, index) => {
        const matchingFile = files.find(file => file.id === post.id);
        const isLastItem = index === posts.data.length - 1;
  
        return (
          <div key={post.id} style={{ backgroundColor: '#282c34', borderRadius: '10px', margin: isLastItem ? '0px 20px 0px' : '0px 20px 20px', padding: '20px', position: 'relative' }}>
            <X onClick={() => handleDeleteTweet(post.id)} size={16} color="red" style={{ position: 'absolute', top: '10px', right: '10px' }} />
            <div style={{ paddingBottom: '10px' }}>
              {matchingFile && (
                <img src={`http://localhost:1337${matchingFile.formats.thumbnail.url}`} alt={post.attributes.description} style={{ maxWidth: '100%', borderRadius: '10px' }} />
              )}
              <p style={{ color: 'white', fontSize: '16px' }}>{post.attributes.description}</p>
              <a href={post.attributes.link} target="_blank" rel="noopener noreferrer" style={{ color: '#61dafb', textDecoration: 'none' }}>
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
