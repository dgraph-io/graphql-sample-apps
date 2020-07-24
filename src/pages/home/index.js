import React from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../components/navbar';


import Sidebar from '../../components/sidebar'

const Home = () => {
    const navProperties = {
        basicStyle: {
            height: 64,
            padding: '0px 24px 0px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
        },
        logo: {
            imageName: 'logo.png',
            height: 30,
            width: 30
        },
        title: {
            text: 'Payments',
            variant: 'h6'
        },
        searchBar: {
            placeholder: 'Search here',
            onChange: () => {}
        },
        navRightItems: [
            { type: 'text', text: 'About', variant: 'h6', href: "https://www.google.com" },
            { type: 'text', text: 'Like Us!', variant: 'h6', onClick: () => {} },
            { type: 'text', text: 'Follow', variant: 'h6' },
            { type: 'icon', badgeContent: 4, oncClick: () => {} },

        ],
        mobileViewNavLink: {
            backgroundColor: '#0B79D0',
            color: 'white',
            top: 64,
            padding: '16px 24px'
        }

    }


    return(
        <Box component="div"  m={1}>
            <Sidebar />
        </Box>
    )
}
export default Home;



