import React from "react";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Logo from "../../assets/images/logo.svg";
import Slash from "../../assets/images/slash.png"
import useStyles from "./sidebar.style"

export const SidebarItem = ({ key, label, icon: Icon, open, className, onClick, link, children = [] }) => {
  const classes = useStyles();
  return (
    <div key={key}>
      <ListItem button onClick={link ? () => window.location = link : onClick} className={className}>
        {Icon && <ListItemIcon>
          <Icon/>
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
          <img src={Logo} alt="logo" style={{maxWidth:"-webkit-fill-available"}}/>
        </div>
        <Divider />
        <List>
          {children.map((child, index) => React.cloneElement(child, {
            key: index,
            open: openSubmenu[index] || false,
            onClick: () => handleClick(index),
          }))}
        </List>
        <div className={classes.logo}>
          <img src={Slash} alt="powered-by-slash" style={{maxWidth:"-webkit-fill-available", "position":"absolute", "bottom":"0px"}}/>
        </div>
      </Drawer>
  );
};
