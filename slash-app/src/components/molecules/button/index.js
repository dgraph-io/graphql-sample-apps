import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../../atoms';

import "./button.css";


const Button = ({ title }) => {
    return (
        <div className="button">
            <Text text={title} fontColor="white" fontSize="little-small" fontWeight="medium" />
        </div>
    );
}

Button.propTypes = {
  title: PropTypes.string.isRequired
};

export default Button;