import React from "react";
import {Typography} from '@material-ui/core';
import Content from '../components/content';

const NotFound = () => {
  return <>
    <Content>
      <Typography>
        That page wasn't found.
      </Typography>
    </Content>
  </>
}

export default NotFound;
