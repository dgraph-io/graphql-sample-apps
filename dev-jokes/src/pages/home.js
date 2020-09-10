import React, { useState, useEffect } from "react";

import Content from "../components/content";
import { Navbar } from "../components/navbar";
import { Selector } from "../components/selector";
import SearchBar from "material-ui-search-bar";
import MasonartGrid from "../components/masonryGrid";

import {
  GET_TAGS,
  GET_APPROVED_POST,
  SEARCH_POSTS,
  SEARCH_BY_TEXT_AND_TAGS,
  SEARCH_POST_BY_TAG,
} from "../gql/queryData";
import useImperativeQuery from "../utils/imperativeQuery";

import { sortBy } from "../utils/utils";
import { useQuery } from "@apollo/react-hooks";
import { Tagger } from "../components/tagger";

const sortByOptions = [
  { name: "Newest", value: "new" },
  { name: "Oldest", value: "old" },
  { name: "Most Liked", value: "liked" },
];

const Home = () => {
  const [mydata, setMydata] = useState(null);
  const [tagOptions, setTagOptions] = useState([]);
  const [textString, setTextString] = useState("");
  const [searchTag, setSearchTag] = useState("");

  const searchPosts = useImperativeQuery(SEARCH_POSTS);
  const searchPostsByTag = useImperativeQuery(SEARCH_POST_BY_TAG);
  const searchByTextAndTags = useImperativeQuery(SEARCH_BY_TEXT_AND_TAGS);
  const resetSearch = useImperativeQuery(GET_APPROVED_POST);
  const { data: postData, loading: ploading, error: perror } = useQuery(
    GET_APPROVED_POST
  );
  const { data: tagsData, loading: tloading, error: terror } = useQuery(
    GET_TAGS
  );

  useEffect(() => {
    if (!tloading && !terror) {
      var options = [];
      tagsData.queryTag.forEach((element) => {
        options.push({ name: element["name"], value: element["name"] });
      });
      // sort alphabetically
      options.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setTagOptions(options);
    }
  }, [tagsData, tloading, terror]);

  useEffect(() => {
    if (!ploading && !perror) {
      setMydata(postData);
    }
  }, [postData, ploading, perror]);

  const reset = async () => {
    const { data } = await resetSearch();
    setMydata(data);
  };

  const search = async (textString = "", tag = "") => {
    // No input defined.
    if ((tag === "") & (textString === "")) {
      reset();
      return;
    }
    // Search by text
    if (tag === "") {
      const { data } = await searchPosts({
        text: textString,
      });
      setMydata(data);
      return;
    }
    // Search by tags
    if (textString === "") {
      const { data } = await searchPostsByTag({
        input: tag,
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
      tags: tag,
    });

    let queryPost = [];
    data.queryPostByTextAndTags.forEach((element) => {
      queryPost.push(element);
    });
    console.log("Search by tag:", queryPost);
    setMydata({ queryPost: queryPost });
  };

  const handleClick = async () => {
    search(textString, searchTag);
    return;
  };

  const handleChange = async (text) => {
    setTextString(text);
    search(text, searchTag);
  };

  const SortBy = async (by) => {
    if (by === "") return;
    let data = mydata;
    console.log("Sorting by:", by);
    setMydata({ queryPost: sortBy(data.queryPost, by) });
    return;
  };

  const onChangeTag = (tag) => {
    setSearchTag(tag);
    search(textString, tag);
  };

  return (
    <>
      <Navbar title="Home" color="primary" />
      <Content>
        {mydata != null && (
          <>
            <div className="homepage-container">
              <div className="homepage-sidebar">
                <Tagger
                  tags={tagOptions}
                  onChange={(e) => {
                    onChangeTag(e.target.value);
                  }}
                />
              </div>

              <div className="homepage-content-container">
                <div className="homepage-search-container">
                  <div className="searchbar-container ">
                    <SearchBar
                      value={textString}
                      label="Search your joke here"
                      onChange={(newText) => handleChange(newText)}
                      onRequestSearch={handleClick}
                      onCancelSearch={() => {
                        setTextString("");
                        search("", searchTag);
                      }}
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div style={{ alignItems: "center" }}>
                    <Selector
                      label={"Sort By"}
                      options={sortByOptions}
                      cb={SortBy}
                    />
                  </div>
                </div>
                <br />
                <MasonartGrid data={mydata} isApproved={true} />
              </div>
            </div>
          </>
        )}
      </Content>
    </>
  );
};

export default Home;
