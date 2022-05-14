// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import init from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = () => {
  const socket = io();
  const app = init(socket);

  const mountNode = document.getElementById('chat');
  const root = ReactDOM.createRoot(mountNode);

  root.render(app);
};

runApp();
