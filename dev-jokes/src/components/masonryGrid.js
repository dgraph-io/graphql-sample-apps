import React from 'react';
import { useLocation } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import PostCard from './card/postCard';

const breakpointColumnsObj = {
  default: 3,
  1200: 3,
  900: 2,
  675: 1,
};

const MasonaryGrid = ({ data, isApproved, allTags, updateCache }) => {
  const location = useLocation();
  const getShortName = (username) => {
    return username.split('@')[0];
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {data.queryPost.map((post) => (
        <PostCard
          size={'345px'}
          author={getShortName(post.createdby.username)}
          text={post.text}
          postID={post.id}
          time={post.timeStamp}
          likes={post.likes}
          flagCount={post.numFlags}
          flags={post.flags}
          tags={post.tags}
          img={post.img}
          isApproved={isApproved}
          id={post.id}
          location={location}
          allTags={allTags}
          updateCache={updateCache}
          clickable={true}
          dummyLikes={post.dummyLikes}
        />
      ))}
    </Masonry>
  );
};

export default MasonaryGrid;
