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

import { g2aTags, sortBy } from "../utils/utils";
import { useQuery } from "@apollo/react-hooks";

const Home = () => {
  const [mydata, setMydata] = useState(null);
  const [tags, setTags] = useState([]);
  const [names, setNames] = useState([]);
  const [textString, setTextString] = useState("");

  const searchPosts = useImperativeQuery(SEARCH_POSTS);
  const searchPostsByTag = useImperativeQuery(SEARCH_POST_BY_TAG);
  const searchByTextAndTags = useImperativeQuery(SEARCH_BY_TEXT_AND_TAGS);
  const { data: postData, loading: ploading, error: perror } = useQuery(
    GET_APPROVED_POST
  );
  const { data: tagsData, loading: tloading, error: terror } = useQuery(
    GET_TAGS
  );

  useEffect(() => {
    if (!tloading && !terror) {
      setNames(g2aTags(tagsData.queryTag));
    }
  }, [tagsData, tloading, terror]);

  useEffect(() => {
    if (!ploading && !perror) {
      setMydata(postData);
    }
  }, [postData, ploading, perror]);

  const handleClick = async () => {
    // No input defined.
    if ((tags.length === 0) & (textString === "")) {
      return;
    }
    // Search by text
    if (tags.length === 0) {
      const { data } = await searchPosts({
        text: textString,
      });
      setMydata(data);
      return;
    }
    // Search by tags
    const tagString = tags.join(" ");
    if (textString === "") {
      const { data } = await searchPostsByTag({
        input: tagString,
      });
      let queryPost = [];
      data.queryTag.forEach((element) => {
        queryPost.push(...element["posts"]);
      });
      setMydata({ queryPost: queryPost });
      return;
    }
    // search by both
    const { data } = await searchByTextAndTags({
      text: textString,
      tags: tagString,
    });

    let queryPost = [];
    data.queryPostByTextAndTags.forEach((element) => {
      queryPost.push(element);
    });
    console.log("Search by tag:", queryPost);
    setMydata({ queryPost: queryPost });
    return;
  };

  const SortBy = async (by) => {
    let data = mydata;
    console.log("Sorting by:", by);
    setMydata({ queryPost: sortBy(data.queryPost, by) });
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
                <Sort cb={SortBy} />
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
