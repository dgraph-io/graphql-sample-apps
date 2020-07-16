import React from "react";
import { storiesOf } from "../../../storybook";
import HomeTemplate from "./index";

storiesOf("Templates/Home", module)
  .add("base", () => <HomeTemplate />);
