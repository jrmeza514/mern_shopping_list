import './App.css';
import { Component } from 'react';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/main';
class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }
  
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <AppNavBar/>
            <div className="container">
              <ShoppingList></ShoppingList>
            </div>
          </div>
        </ThemeProvider>
      </Provider>
    )
  }
    
}

export default App;