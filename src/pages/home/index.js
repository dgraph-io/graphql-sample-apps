import React from "react";
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import Content from '../../components/content';
import { Navbar, NavbarItem } from '../../components/navbar';

const Home = () => {
  return <>
    <Navbar title="Home">
      <NavbarItem type='icon' iconName='search.svg' oncClick={() => { }} />
      <NavbarItem type='icon' iconName='user.svg' oncClick={() => { }} />
      <NavbarItem type='icon' iconName='settings.svg' oncClick={() => { }} />
    </Navbar>
    <Content>
      <Typography paragraph>
        <Link to="/types">See Types Here</Link>
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
        tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
        nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
      </Typography>
    </Content>
  </>
}

export default Home;
