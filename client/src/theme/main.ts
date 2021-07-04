import { createMuiTheme } from '@material-ui/core/styles';
export const light = createMuiTheme({
  palette: {
    primary: {
      light: '#1a2327',
      main: '#263238',
      dark: '#515b5f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#a73a38',
      main: '#ef5350',
      dark: '#f27573',
      contrastText: '#fff',
    }
  }
});

export const dark = createMuiTheme({
  palette: {
    primary: {
      light: '#1a2327',
      main: '#181818',
      dark: '#515b5f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#e0e0e0',
      contrastText: '#212121',
    },
    background: {
      default: "#37474f",
      paper: "#181818"
    },
    text: {
      primary: "#fff",
      secondary: "#fff"
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: "#282828",
          backgroundImage: "none"
        }
      }

    }
  }
});
