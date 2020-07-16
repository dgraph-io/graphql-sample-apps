import React from "react";

import { TwitterTweetEmbed } from "react-twitter-embed";

import "./tweetCard.css";

const TweetCard = (probs) => {
  return (
    <div className="tweet-card">
      <TwitterTweetEmbed
        className="tweet-embed"
        tweetId={probs.tweetId}
        onLoad={(tweetWidgetEl) => {
          // if (tweetWidgetEl && tweetWidgetEl.shadowRoot) {
            // const tweetEl = tweetWidgetEl.shadowRoot.querySelector(
            //   ".EmbeddedTweet"
            // );
            // tweetEl.style.boxShadow = "0px 2px 8px rgba(6, 26, 54, 0.133";
            // tweetEl.style.borderRadius = "8px";
          // }
        }}
      />
    </div>
  );
};
export default TweetCard;
