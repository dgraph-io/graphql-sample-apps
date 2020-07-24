import { yellow } from "@material-ui/core/colors";

const theme = {
  palette: {
    primary: {
      light: '#64B6F7',
      main: '#2196F3',
      dark: '#0B79D0',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#F06191',
      main: '#E91E63',
      dark: '#BE134D',
      contrastText: '#FFFFFF'
    },
    error: {
      light: '#F88078',
      main: '#F44336',
      dark: '#E31B0C',
      contrastText: '#FFFFFF'
    },
    warning: {
      light: '#FFB547',
      main: '#FF9800',
      dark: '#C77700',
      contrastText: 'rgba(0,0,0,87)'
    },
    info: {
      light: '#64B6F7',
      main: '#2196F3',
      dark: '#0B79D0',
      contrastText: '#FFFFFF'
    },
    success: {
      light: '#7BC67E',
      main: '#4CAF50',
      dark: '#3B873E',
      contrastText: 'rgba(0,0,0,87)'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.12
    }
  },
  typography:{
    h1: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '96px',
      lineHeight: '112px',
      letterSpacing: '-1.5px',
    },
    h2: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '60px',
      lineHeight: '72px',
      letterSpacing: '-0.5px',
    },
    h3: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '0px',
    },
    h4: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '34px',
      lineHeight: '42px',
      letterSpacing: '0.25px',
    },
    h5: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0px',
    },
    h6: {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '2px',
      letterSpacing: '0.15px',
    }
  },
  button: {
    background: "yellow",

  }
}

export default theme;