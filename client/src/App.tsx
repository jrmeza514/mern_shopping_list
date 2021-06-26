import './App.css';
import { Component } from 'react';
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }
  
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar/>
          <div className="container">
            <ShoppingList></ShoppingList>
          </div>
        </div>
      </Provider>
    )
  }
    
}

export default App;