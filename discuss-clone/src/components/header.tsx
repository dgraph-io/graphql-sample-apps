import React, { useState, useEffect } from "react";
import {
  Image,
  Icon,
  Modal,
  Form,
  Button,
  Dropdown,
  Loader,
} from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "./types/operations";
import { avatar } from "./avatar"

export function AppHeader() {
  const [updateSettings, setUpdateSettings] = useState(false);
  const [name, setName] = useState("");
  const [avatarImg, setAvatarImg] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const { data, loading, error } = useGetUserQuery({
    variables: { username: isAuthenticated ? user.email : "" }
  });
  const [updateUserMutation] = useUpdateUserMutation();

  const avatarsOptions = [
    {
      key: "/1.svg",
      text: "Avatar 1",
      value: "/1.svg",
      image: { avatar: true, src: "/1.svg" },
    },
    {
      key: "/2.svg",
      text: "Avatar 2",
      value: "/2.svg",
      image: { avatar: true, src: "/2.svg" },
    },
    {
      key: "/3.svg",
      text: "Avatar 3",
      value: "/3.svg",
      image: { avatar: true, src: "/3.svg" },
    },
    {
      key: "/4.svg",
      text: "Avatar 4",
      value: "/4.svg",
      image: { avatar: true, src: "/4.svg" },
    },
    {
      key: "/5.svg",
      text: "Avatar 5",
      value: "/5.svg",
      image: { avatar: true, src: "/5.svg" },
    },
    {
      key: "/6.svg",
      text: "Avatar 6",
      value: "/6.svg",
      image: { avatar: true, src: "/6.svg" },
    },
    {
      key: "/7.svg",
      text: "Avatar 7",
      value: "/7.svg",
      image: { avatar: true, src: "/7.svg" },
    },
    {
      key: "/8.svg",
      text: "Avatar 8",
      value: "/8.svg",
      image: { avatar: true, src: "/8.svg" },
    },
  ];

  if (loading) return <Loader />;
  if (error) return <div>`Error! ${error.message}`</div>;

  const currentSettings = () => {
    setName(data?.getUser?.displayName ? data.getUser.displayName : "");
    setAvatarImg(data?.getUser?.avatarImg ? data.getUser.avatarImg : "/" + avatar + ".svg");
    setCurrentUser(user.email)
  };

  const submitSettings = () => {
    updateUserMutation({variables: {username: currentUser, user:{displayName: name, avatarImg: avatarImg}}})
  };

  const showSettings = (
    <Modal
      onClose={() => setUpdateSettings(false)}
      onOpen={() => setUpdateSettings(true)}
      open={updateSettings}
    >
      <Modal.Header>Update Settings</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Display Name</label>
              <input
                placeholder="Update display name..."
                style={{
                  backgroundColor: "#f3f3f3",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Avatar</label>
              <Dropdown
                placeholder="You must select a cool avatar..."
                fluid
                selection
                options={avatarsOptions}
                defaultValue={avatarImg}
                style={{
                  backgroundColor: "#f3f3f3",
                }}
                onChange={(e, data) => setAvatarImg(data.value+"")}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setUpdateSettings(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={submitSettings}
          positive
        />
      </Modal.Actions>
    </Modal>
  );

  const userItem = isAuthenticated ? (
    <span>
      <Image
        src={avatar(data?.getUser?.avatarImg)}
        avatar
        style={{ cursor: "pointer" }}
        onClick={() => {
          currentSettings();
          setUpdateSettings(true);
        }}
      />
      <button
        className="ui button"
        style={{
          background: "linear-gradient(135deg, #ff1800, #ff009b)",
          color: "white",
        }}
        onClick={() => logout()}
      >
        Logout
      </button>
    </span>
  ) : (
    <span>
      <button
        className="ui button"
        style={{
          background: "linear-gradient(135deg, #ff1800, #ff009b)",
          color: "white",
        }}
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </span>
  );

  return (
    <>
      {showSettings}
      <div
        className="ui clearing segment"
        style={{
          border: "0px",
          borderRadius: "0px",
          boxShadow: "inset 0 0 0 10px #eaeaea",
          padding: "1.5em 1.5em",
          paddingTop: "0px",
        }}
      >
        <h3
          className="ui right floated header"
          style={{ paddingRight: "7rem", transform: "translate(-10px, 50px)" }}
        >
          {userItem}
        </h3>
        <h3
          className="ui left floated header"
          style={{ paddingLeft: "7rem", transform: "translate(-23px, 40px)" }}
        >
          <Link to="/">
            <div style={{ display: "flex" }}>
              <span>
                <Image
                  size="tiny"
                  src="/diggy.png"
                  style={{ marginRight: "1.5em" }}
                />{" "}
              </span>
              <div>
                <p
                  style={{
                    background: "-webkit-linear-gradient(#ff1800, #ff009b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "0px",
                    fontSize: "x-large",
                  }}
                >
                  Dgraph
                </p>
                <p style={{ fontSize: "smaller" }}>DISCUSS</p>
              </div>
            </div>
          </Link>
        </h3>
      </div>
    </>
  );
}
