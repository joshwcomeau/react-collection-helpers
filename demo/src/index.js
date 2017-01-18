import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import Header from './components/Header';

import { Filter, Find, First } from '../../src';


const Demo = () => (
  <App>
    <Header />
  </App>
);

render(<Demo/>, document.querySelector('#demo'))
