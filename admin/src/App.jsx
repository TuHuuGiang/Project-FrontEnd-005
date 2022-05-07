import Layout from './layouts';
import store from './redux/store/store';
import { Provider } from 'react-redux'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
