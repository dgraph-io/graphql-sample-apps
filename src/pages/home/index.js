import React from "react";
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import SettingsIcon from '@material-ui/icons/Settings';

import Sidebar from '../../components/sidebar'


const sidelists = [
  {
    key: "home",
    label: "Home",
    icon: HomeIcon,
    items: []
  },
  {
    key: "customers",
    label: "Customers",
    icon: PeopleIcon,
    items: []
  },
  {
    key: "payments",
    label: "Payments",
    icon: CreditCardIcon,
    items: []
  },
  {
    key: "mangment",
    label: "Managment",
    icon: SettingsIcon,
    items: [
      {
        key: "product",
        label: "Product",
      },
      {
        key: "order",
        label: "Order",
      },
    ]
  }
];

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
            <Sidebar sidelists={sidelists} />
        </Box>
    )
}
export default Home;



