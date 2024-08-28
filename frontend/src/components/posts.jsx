import React from 'react'
import Post from './Post'
const Posts = () => {
  return (
    <div>
      {[1,2,3,4].map((item,index)=><Post key={index}/>)}
    </div>
  )
}

export default Posts

// import React, { useState, useEffect } from 'react'
// import Post from './Post'

// const Posts = () => {
//   const [posts, setPosts] = useState([1, 2, 3, 4]);

//   // Function to load more posts
//   const loadMorePosts = () => {
//     const newPosts = posts.length + 1;
//     setPosts([...posts, newPosts, newPosts + 1, newPosts + 2, newPosts + 3]);
//   }

//   // Infinite scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
//         loadMorePosts();
//       }
//     }

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [posts]);

//   return (
//     <div>
//       {posts.map((item, index) => <Post key={index} />)}
//     </div>
//   )
// }

// export default Posts
