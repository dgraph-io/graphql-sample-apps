import React from "react";
import { storiesOf } from "../../../storybook";
import Button from "./index";


storiesOf("Molecules/Button", module)
  .add("base", () => <Button title="This is button" />);
