import React from "react";
import Masonry from "react-masonry-css";

import { TweetCard } from "../../atoms";

import "./tweetResults.css";

const breakpointColumnsObj = {
  default: 4,
  800: 2,
  700: 1,
};

const TweetResults = ({ tweetData }) => {
  return (
    <Masonry className="my-masonry-grid" columnClassName="my-masonry-grid_column" breakpointCols={breakpointColumnsObj}>
      {tweetData && tweetData.map((tweet) => (<TweetCard tweetId={tweet.tweetId} key={tweet.id} />))}
    </Masonry>
  );
};

export default TweetResults;
