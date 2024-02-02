import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Heart, Bookmark, X } from 'react-feather';
export const refreshPage = () =>{
  window.location.reload(false);
  }
  
function Post() {
    const [posts, setPosts] = useState([]);
    const [files, setFiles] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    const handleHeartLogoClick = (postId) => {
      if (likedPosts.includes(postId)) {
        setLikedPosts(likedPosts.filter(id => id !== postId));
      } else {
        setLikedPosts([...likedPosts, postId]);
      }
    };
    
    
     
    const loggedInUsername = localStorage.getItem('username');

    const handleDeleteTweet = async (postId, post) => {
      if (loggedInUsername === post) {
        try {
            const response = await fetch(`http://localhost:1337/api/posts/${postId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log(`Post with ID ${postId} deleted successfully.`);
            } else {
                console.error("Failed to delete post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    refreshPage();
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/posts?populate=*");
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
    <div style={{backgroundColor: '#000000', marginTop: '15.2%', padding: '20px'}}>
      {Array.isArray(posts.data) && posts.data.map((post, index) => {
        const isLastItem = index === posts.data.length - 1;
  
        return (
          <div key={post.id} style={{ backgroundColor: '#000000', margin: isLastItem ? '0px 0px 0px' : '0px 0px 20px', padding: '20px', position: 'relative', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s linear', borderLeft: "solid 2px white", marginBottom:"0px", paddingTop:"0px", marginBottom: "50px" }}>
            {post.attributes.user === loggedInUsername && <X onClick={() => handleDeleteTweet(post.id, post.attributes.user)} size={24} color="gray" style={{ position: 'absolute', top: '10px', right: '10px' }} />}
            <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={post.attributes.av} alt="Avatar" style={{ width: '50px', borderRadius: '50%', marginRight: '10px', marginBottom: "15px" }} />
              <p style={{ color: '#ffffff', fontSize: '30px', fontFamily: 'Poppins', fontWeight: 'bold', paddingBottom: '15px' }}>{post.attributes.user}</p>
            </div>
            {post?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url ? (
                <img src={`http://localhost:1337${post?.attributes?.image?.data?.attributes?.formats?.thumbnail?.url}`} alt={post.attributes.description} style={{marginBottom: '10px', width: '100%'}} />
            ) : null}
              <p style={{ color: '#ffffff', fontSize: '15px', fontFamily: 'Poppins', fontWeight: 'Regular', paddingBottom: "15px" }}>{post.attributes.description}</p>
              <a href={post.attributes.link} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', overflowWrap: 'break-word', paddingBottom: "25px"}}>
                {post.attributes.wordLink}
              </a>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div>
                <Heart stroke="white" onClick={() => handleHeartLogoClick(post.id)} size={22} fill={likedPosts.includes(post.id) ? 'white' : 'black'} />
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
