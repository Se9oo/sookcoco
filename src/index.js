import React from 'react';
import ReactDOM from 'react-dom';
import Sookcoco from './Sookcoco';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <Sookcoco />
    </React.StrictMode>,
    rootElement
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Sookcoco />
    </React.StrictMode>,
    rootElement
  );
}
