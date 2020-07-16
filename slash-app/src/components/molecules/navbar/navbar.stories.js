import React from "react";
import { storiesOf } from "../../../storybook";
import Navbar from "./index";

storiesOf("Molecules/Navbar", module)
  .add("base", () => <Navbar />);
