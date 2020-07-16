import React from "react";
import { storiesOf } from "../../../storybook";
import SearchBar from "./index";

storiesOf("Atoms/Searchbar", module)
  .add("base", () => <SearchBar placeholder="Search Tweet Site" />);
