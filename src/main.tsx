import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './Features/store/store'; // Ajusta la ruta según corresponda
import App from './App'; // Ajusta la ruta según corresponda
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
