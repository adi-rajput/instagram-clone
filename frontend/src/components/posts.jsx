import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((store) => store.post?.posts || []);

  // if (!Array.isArray(posts) || posts.length === 0) {
  //   return <p>No posts available.</p>;
  // }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;

