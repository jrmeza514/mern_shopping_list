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
      main: '#000',
      dark: '#515b5f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#a73a38',
      main: '#000',
      dark: '#f27573',
      contrastText: '#fff',
    }
  }
});

export default {
  light,
  dark
}