import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));