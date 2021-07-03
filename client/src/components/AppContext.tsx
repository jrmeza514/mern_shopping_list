import AppNavBar from './header/AppNavBar';
import { connect, } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from '../theme/main';
import AppContent from './AppContent';
import { BrowserRouter as Router } from 'react-router-dom';
import { IAuthReduxProps, UserPrefTheme } from '../types/interfaces';

interface AppContextProps {
  themePref: UserPrefTheme
}

const getTheme = (pref: UserPrefTheme) => {
  if (pref === "THEME_DARK") return dark;
  if (pref === "THEME_LIGHT") return light;
  if (localStorage.getItem("theme") === "THEME_DARK") return dark;
  if (localStorage.getItem("theme") === "THEME_LIGHT") return light;
  return light;
}

const AppContext = ({ themePref }: AppContextProps) => {

  return (
    <ThemeProvider theme={getTheme(themePref)}>
      <div className="App">
        <Router>
          <AppNavBar />
          <AppContent />
        </Router>
      </div>
    </ThemeProvider>
  )

}

const mapStateToProps = (state: IAuthReduxProps) => ({
  themePref: state.auth.user?.userPrefs.theme
})

export default connect(mapStateToProps, {})(AppContext);