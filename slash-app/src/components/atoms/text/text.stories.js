import React from "react";
import { storiesOf } from "../../../storybook";
import Text from "./index";

storiesOf("Atoms/Text", module)
  .add("base", () => <Text text="lorem ipsum" fontColor="darkBlue" fontSize="small" />);
