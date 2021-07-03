import AppNavBar from './header/AppNavBar';
import { connect, } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from '../theme/main';
import AppContent from './AppContent';
import { BrowserRouter as Router } from 'react-router-dom';

interface AppContextProps {
  darkMode: boolean
}

const AppContext = ({ darkMode }: AppContextProps) => {

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <div className="App">
        <Router>
          <AppNavBar />
          <AppContent />
        </Router>
      </div>
    </ThemeProvider>
  )

}
interface ThemeState {
  theme: {
    darkMode: boolean
  }
}
const mapStateToProps = (state: ThemeState) => ({
  darkMode: state.theme.darkMode
})

export default connect(mapStateToProps, {})(AppContext);