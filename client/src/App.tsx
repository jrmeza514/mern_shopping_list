import './App.scss';
import { Component } from 'react';
import AppNavBar from './components/header/AppNavBar';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/main';
import AppContent from './components/AppContent';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <AppNavBar />
              <AppContent />
            </Router>
          </div>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App;