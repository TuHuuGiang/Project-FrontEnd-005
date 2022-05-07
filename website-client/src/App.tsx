import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './layouts';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <Layout />
      <ToastContainer />
    </Provider>
  );
}

export default App;
