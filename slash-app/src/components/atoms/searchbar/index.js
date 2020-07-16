import React from "react";
import PropTypes from "prop-types";

import "./searchbar.css";

import SearchIcon from '../../svg/searchicon';

const SearchBar = ({ placeholder }) => (
    <div className="searchbar-wrapper">
        <input className="input-field" type="text" placeholder={placeholder} />
        <div className="search-icon"><SearchIcon /></div>
    </div>
);

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired
}

export default SearchBar;