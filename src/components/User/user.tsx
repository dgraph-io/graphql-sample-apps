import { User } from "../../types/graphql";
import { Image } from "semantic-ui-react";
import React from "react";

export function UserWithIcon(user: User) {

  return (
    <span>
      <Image
        src={user.image || `https://identicon-api.herokuapp.com/${user.displayName?.replace(/[^A-Za-z0-9!?]/,'')}/120?format=png`}
        avatar
      />
      <span>{user.displayName ?? user.username}</span>
    </span>
  );
}
