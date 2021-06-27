import './App.scss';
import { Component } from 'react';
import AppNavBar from './components/header/AppNavBar';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/main';
import AppContent from './components/AppContent';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <AppNavBar />
            <AppContent />
          </div>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App;