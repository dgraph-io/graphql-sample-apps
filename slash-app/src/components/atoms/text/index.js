import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

import "./text.css";

const Text = ({ fontSize, fontColor, fontWeight, text, opacity }) => {
  const styles = cx(
    {
      "fontsize-extrasmall": fontSize === "extra-small",
      "fontsize-small": fontSize === "small",
      "fontsize-little-small": fontSize === "little-small",
      "fontsize-medium": fontSize === "medium",
      "fontsize-little-large": fontSize === "little-large",
      "fontsize-large": fontSize === "large",
      "fontsize-extra-large": fontSize === "extra-large",

      "rs-fontsize-small": fontSize === "rs-small",
      "rs-fontsize-medium": fontSize === "rs-medium",
      "rs-fontsize-large": fontSize === "rs-large",
      "rs-fontsize-extra-large": fontSize === "rs-extra-large",

    },
    {
      "fontcolor-white": fontColor === "white",
      "fontcolor-dark-blue": fontColor === "darkBlue",
      "fontcolor-black": fontColor === "black",
    },
    {
      "fontweight-bold": fontWeight === "bold",
      "fontweight-medium": fontWeight === "medium"
    },
    {
      "opacity-light": opacity === "light",
      "opacity-normal": opacity === "normal"
    }
  );

  return <div className={styles}>{text}</div>;
};

Text.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  fontColor: PropTypes.string,
  fontWeight: PropTypes.string,
  opacity: PropTypes.string
};

Text.defaultProps = {
  fontSize: "small",
  fontColor: "white",
  fontWeight: "normal",
  opacity: "normal"
};

export default Text;
