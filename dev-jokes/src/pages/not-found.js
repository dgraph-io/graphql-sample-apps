import React from "react";
import {Typography} from '@material-ui/core';
import Content from '../components/content';

const NotFound = () => {
  return <>
    <Content>
      <Typography>
        That page wasn't found. Did you forget to remove this link from the sidebar?
      </Typography>
    </Content>
  </>
}

export default NotFound;
