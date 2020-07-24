import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import SettingsIcon from '@material-ui/icons/Settings';

const sidebarData = [
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

export default sidebarData;