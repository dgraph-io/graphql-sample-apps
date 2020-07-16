import React, { useState } from "react";
import PropTypes from "prop-types";

import { Text } from "../../atoms";
import { ArrowDownIcon } from "../../svg";

import "./dropdown.css";

const Dropdown = ({ items, onClick }) => {
  const [showList, setShowList ] = useState(false)
  const [ selectedItem, setSelectedItem ] = useState(items[0]) 

  const renderItems = (items) =>
    items.map((data, index) => (
      <li className="cursor" key={index} onClick={() => {setSelectedItem(data); setShowList(false); onClick(data)}}>
        <Text text={data.value} key={index} fontSize="small" fontColor="black" />
      </li>
    ));

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-button">
        <Text text={selectedItem ? selectedItem.value : ''} fontSize="small" fontColor="black" />
        <div
          className="arrow cursor"
          onClick={() => {
            setShowList(!showList);
          }}
        >
          <ArrowDownIcon />
        </div>
      </div>
      {showList ? (
        <ul className="dropdown-list">{renderItems(items)}</ul>
      ) : null}
    </div>
  );
};

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default Dropdown;
