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
    return(
        <Box component="div"  m={1}>
            <Sidebar sidelists={sidelists} />
        </Box>
    )
}
export default Home;



