import React from "react";
import { storiesOf } from "../../../storybook";
import TweetCard from "./index";

storiesOf("Atoms/TweetCard", module)
  .add("base", () => <TweetCard tweetId="1273856100241113088"/>);
