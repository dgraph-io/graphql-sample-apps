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

export const SidebarItem = ({ key, label, icon: Icon, open, className, onClick, children = [] }) => {
  const classes = useStyles();
  return (
    <div key={key}>
      <ListItem button onClick={onClick} className={className}>
        {Icon && <ListItemIcon>
          <Icon />
        </ListItemIcon>}
        <ListItemText primary={label} />
        {children.length > 0 ? (
          open ? (
            <ExpandLess />
          ) : (
              <ExpandMore />
            )
        ) : null}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, index) => React.cloneElement(child, {
            key: index,
            className: classes.nested,
          }))}
        </List>
      </Collapse>
    </div>
  );
}

export const Sidebar = ({children = []}) => {
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
          {children.map((child, index) => React.cloneElement(child, {
            key: index,
            open: openSubmenu[index] || false,
            onClick: () => handleClick(index),
          }))}
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
