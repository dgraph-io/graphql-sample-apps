import React from "react";
import { storiesOf } from "../../../storybook";
import Dropdown from "./index";

const dummyData = ['Authors', 'Item one', 'Item two', 'Item three']

storiesOf("Molecules/Dropdown", module)
  .add("base", () => <Dropdown items={dummyData} onClick={()=> {}} heading='Authors'/>);
