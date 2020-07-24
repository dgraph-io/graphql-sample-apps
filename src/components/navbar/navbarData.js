

// Note: Uncomment/comment the required/non-required parts as the per the use.

const navbarData = {
    basicStyle: {
    height: 64,
    padding: '0px 24px 0px 24px',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), #2196F3',
    color: 'white',
    },
    // logo: {
    //     imageName: 'logo.png',
    //     height: 20,
    //     width: 20
    // },
    title: {
    text: 'Payments',
    variant: 'h6'
    },
    // searchBar: {
    // placeholder: 'Search here',
    // onChange: () => {}
    // },
    navRightItems: [
        // { type: 'text', text: 'About', variant: 'h6', href: "https://www.google.com" },
        // { type: 'text', text: 'Like Us!', variant: 'h6', onClick: () => {} },
        // { type: 'text', text: 'Follow', variant: 'h6' },
        { type: 'icon', iconName: 'search.svg', height: 20, width: 20 , oncClick: () => {} },
        { type: 'icon', iconName: 'user.svg', height: 20, width: 20 , oncClick: () => {} },
        { type: 'icon', iconName: 'settings.svg', height: 20, width: 20 , oncClick: () => {} },

    ],
    mobileViewNavLink: {
        backgroundColor: '#0B79D0',
        color: 'white',
        top: 64,
        padding: '16px 24px'
    }
}

export default navbarData;