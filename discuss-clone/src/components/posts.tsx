import React, { useState } from "react";
import {
  Header,
  Label,
  Loader,
  Image,
  Table,
  Dropdown,
  Input,
  Button,
} from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAllPostsQuery, useFilterPostsLazyQuery } from "./types/operations";
import { useCategories } from "./categories";
import { Link } from "react-router-dom";
import { avatar } from "./avatar";

export function PostFeed() {
  const { user } = useAuth0();

  const { data, loading, error } = useAllPostsQuery();
  const [
    getFilteredPosts,
    { loading: filterLoading, data: filteredData, error: filterError },
  ] = useFilterPostsLazyQuery({onCompleted: () => setSearchStatus(true)});

  const {
    allCategories,
    loading: catLoading,
    error: catError,
  } = useCategories(user?.email ?? "");

  const [searchText, setSearchText] = useState("");
  const [category, setCategory]: any = useState("");
  const [tags, setTags]: any = useState("");
  const [searchStatus, setSearchStatus] = useState(false);

  if (loading || catLoading || filterLoading) return <Loader />;
  if (error) return `Error! ${error.message}`;
  if (catError) return `Error! ${catError.message}`;
  if (filterError) return `Error! ${filterError.message}`;

  const categoriesOptions = allCategories.map((category) => {
    return { key: category?.id, text: category?.name, value: category?.id };
  });

  const searchPosts = () => {
    let filter;
    if (searchText === "" && tags !== "") {
      filter = {
          tags: { allofterms: tags },
        }
    } else if (searchText !== "" && tags === ""){
      filter= {
          title: { anyofterms: searchText },
          or: { text: { anyoftext: searchText } },
        }
    } else if(searchText !== "" && tags !== "") {
      filter = {
        title: { anyofterms: searchText },
        tags: { allofterms: tags },
        or: { text: { anyoftext: searchText } },
      };
    } else {
      filter= {}
    }
    getFilteredPosts({
      variables: {
        filter: filter,
      },
    });
  };

  const dataset = searchStatus? filteredData?.queryPost : data?.queryPost

  const items = dataset?.map((post) => {
    const likes = post?.likes ?? 0;
    const tagsArray = post?.tags?.trim().split(/\s+/) || [];

    return (
      <Table.Row key={post?.id}>
        <Table.Cell>
          <Link
            to={{
              pathname: "/post/" + post?.id,
            }}
          >
            <Header as="h4" image>
              <Image src={avatar(post?.author.avatarImg)} rounded size="mini" />
              <Header.Content>
                {post?.title}
                <Header.Subheader>{post?.author.displayName}</Header.Subheader>
              </Header.Content>
            </Header>
          </Link>
        </Table.Cell>
        <Table.Cell>
          <span className="ui red empty mini circular label"></span>{" "}
          {" " + post?.category.name}
        </Table.Cell>
        <Table.Cell>
          {tagsArray.map((tag) => {
            if (tag !== "") {
              return (
                <Label as="a" basic color="grey" key={tag}>
                  {tag}
                </Label>
              );
            }
            return;
          })}
        </Table.Cell>
        <Table.Cell>
          <p>
            <i className="heart outline icon"></i> {likes} Like
            {likes === 1 ? "" : "s"}
          </p>
          <p>
            {" "}
            <i className="comment outline icon"></i> {post?.comments.length}{" "}
            Replies
          </p>
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <>
      <div className="flex mb-10">
        <Input
          icon="search"
          placeholder="Type any keywords..."
          className="mr-3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Dropdown
          placeholder="Categories"
          fluid
          search
          selection
          className="mr-3 category-field"
          defaultValue={category}
          options={categoriesOptions}
          onChange={(e, data: any) => setCategory(data.value)}
        />
        <Input
          placeholder="Enter space separated tags..."
          className="mr-3 tags-field"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Button
          className="dgraph-btn mr-1"
          onClick={searchPosts}
        >
          Search
        </Button>
      </div>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Posts</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Tags</Table.HeaderCell>
            <Table.HeaderCell>Responses</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{items}</Table.Body>
      </Table>
    </>
  );
}
