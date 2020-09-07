import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 180;
const drawerWidthSm = 60;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink:0,
    [theme.breakpoints.down('xs')]: {
      width: drawerWidthSm,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#19192c",
    flexShrink:0,
    [theme.breakpoints.down('xs')]: {
      width: drawerWidthSm,
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  logo: {
    display: "flex",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "center",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  hideSidebar: {
    marginTop: "100%",
  },
}));

export default useStyles;