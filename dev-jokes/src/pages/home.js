import React, { useState, useEffect } from "react";

import Content from "../components/content";
import { Navbar } from "../components/navbar";
import { Sort } from "../components/sort";
import SearchBar from "material-ui-search-bar";
import TagSelector from "../components/tagSelector";
import MasonartGrid from "../components/masonryGrid";

import {
  GET_TAGS,
  GET_APPROVED_POST,
  SEARCH_POSTS,
  SEARCH_BY_TEXT_AND_TAGS,
  SEARCH_POST_BY_TAG,
} from "../gql/queryData";
import useImperativeQuery from "../utils/imperativeQuery";

import { g2aTags } from "../utils/utils";
import { useQuery } from "@apollo/react-hooks";

const Home = () => {
  const [mydata, setMydata] = useState(null);
  const [tags, setTags] = useState([]);
  const [names, setNames] = useState([]);
  const [textString, setTextString] = useState("");
  const searchPosts = useImperativeQuery(SEARCH_POSTS);
  const searchPostsByTag = useImperativeQuery(SEARCH_POST_BY_TAG);
  const { data: postData, loading: ploading, error: perror } = useQuery(
    GET_APPROVED_POST
  );
  const { data: tagsData, loading: tloading, error: terror } = useQuery(
    GET_TAGS
  );
  const searchByTextAndTags = useImperativeQuery(SEARCH_BY_TEXT_AND_TAGS);

  useEffect(() => {
    if (!tloading && !terror) {
      setNames(g2aTags(tagsData.queryTag));
    }
  }, [tagsData, tloading, terror]);

  useEffect(() => {
    if (!ploading && !perror) {
      setMydata(postData);
      console.log(postData);
    }
  }, [postData, ploading, perror]);

  const handleClick = async () => {
    if ((tags.length === 0) & (textString === "")) {
      return;
    }
    if (tags.length === 0) {
      const { data } = await searchPosts({
        text: textString,
      });
      console.log(data);
      setMydata(data);
      return;
    }
    const tagString = tags.join(" ");
    if (textString === "") {
      const { data } = await searchPostsByTag({
        input: tagString,
      });
      let queryPost = [];
      data.queryTag.forEach((element) => {
        queryPost.push(...element["posts"]);
      });
      console.log("here");
      console.log(data);
      console.log(queryPost);
      let formatted_data = { queryPost: queryPost };
      console.log("Search by tag:", formatted_data);
      setMydata(formatted_data);
      return;
    }

    console.log(textString);
    console.log(tagString);
    const { data } = await searchByTextAndTags({
      text: textString,
      tags: tagString,
    });
    console.log(data);
    let queryPost = [];
    data.queryPostByTextAndTags.forEach((element) => {
      queryPost.push(element);
    });
    console.log(queryPost);
    let formatted_data = { queryPost: queryPost };
    console.log("Search by tag:", formatted_data);
    setMydata(formatted_data);
    return;
  };

  const sortBy = async (by) => {
    let data, sortedData, newData;
    data = mydata;
    console.log("triggered", by);

    if (by === "new") {
      newData = data.queryPost
        .slice()
        .sort((a, b) => Date.parse(b.timeStamp) - Date.parse(a.timeStamp));
    } else if (by === "old") {
      newData = data.queryPost
        .slice()
        .sort((a, b) => Date.parse(a.timeStamp) - Date.parse(b.timeStamp));
    } else if (by === "liked") {
      newData = data.queryPost
        .slice()
        .sort((a, b) => b.likes.length - a.likes.length);
    }
    sortedData = { queryPost: newData };
    setMydata(sortedData);
    return;
  };

  return (
    <>
      <Navbar title="Home" color="primary" />
      <Content>
        {mydata != null && (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SearchBar
                value={textString}
                label="Search your joke here"
                onChange={(newText) => setTextString(newText)}
                onRequestSearch={handleClick}
              />
              <TagSelector
                names={names}
                tags={tags}
                handleChange={(e) => setTags(e.target.value)}
              />
              <div style={{ marginLeft: "auto", alignItems: "center" }}>
                <Sort cb={sortBy} />
              </div>
            </div>
            <MasonartGrid data={mydata} isApproved={true}/>
          </>
        )}
      </Content>
    </>
  );
};

export default Home;
