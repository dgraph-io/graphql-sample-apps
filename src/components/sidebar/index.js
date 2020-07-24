import React from "react";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Logo from "../../assets/images/logo.svg";
import useStyles from "./sidebar.style"

const Sidebar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openSubmenu, setOpenSubmenu] = React.useState({});

  const handleClick = (key) => {
    setOpenSubmenu({ ...openSubmenu, [key]: !openSubmenu[key] });
    setOpen(true);
  };

  return (
    
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <Divider />
        <div className={classes.sideBarIcons}>
          <SearchIcon />
          <PersonIcon />
          <SettingsApplicationsIcon />
        </div>
        <Divider />
        <List>
          {props.sidelists.map(({ key, label, icon: Icon, items }) => {
            const open = openSubmenu[key] || false;
            return (
              <div key={key}>
                <ListItem button onClick={() => handleClick(key)}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                  {items.length > 0 ? (
                    open ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {items.map(({ key: childKey, label: childLabel }) => (
                      <ListItem
                        key={childKey}
                        button
                        className={classes.nested}
                      >
                        <ListItemText primary={childLabel} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            );
          })}
        </List>
        {/* <div className={clsx(classes.hideSidebar)}>
          <IconButton onClick={handleDrawerOpen}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
            <ListItemText primary="Collapse menu" />
          </IconButton>
        </div> */}
      </Drawer>
  );
};

export default Sidebar;
