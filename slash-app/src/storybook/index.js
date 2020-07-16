import React from "react";
import * as storybook from "@storybook/react";
import "../assets/stylesheets/app.css";
import "typeface-open-sans";

export const storiesOf = componentName => storybook.storiesOf(componentName, module)
  .addDecorator(story => {
    global.width = window.outerWidth;
    return (
      <>
        <script>{global.width}</script>
        {story()}
      </>
    );
  });
