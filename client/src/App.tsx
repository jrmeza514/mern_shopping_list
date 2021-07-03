import './App.scss';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './actions/authActions';
import AppContext from './components/AppContext';
import store from './store';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <Provider store={store}>
      <AppContext />
    </Provider>
  )
}

export default App;