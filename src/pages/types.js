import React from "react";
import Typography from '@material-ui/core/Typography';

import Content from '../components/content';
import { Navbar } from '../components/navbar';

const Types = () => {
  return <>
    <Navbar title="Types" />
    <Content>
      <Typography paragraph>Foobar</Typography>
    </Content>
  </>
}

export default Types;
