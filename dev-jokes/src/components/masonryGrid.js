import React from "react";
import { useLocation } from "react-router-dom";
import Masonry from "react-masonry-css";

import PostCard from "./card/postCard";

const MasonaryGrid = ({data, isApproved, allTags, updateCache}) => {
  const location = useLocation();
  const getShortName = (username) => {
    return username.split('@')[0]
  }
  return(
    <Masonry
      breakpointCols={4}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {data.queryPost.map((post) => (
        <PostCard
          size={"345px"}
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
        />
      ))}
    </Masonry>
  )
}

export default MasonaryGrid;