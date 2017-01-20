import React from 'react';
import { render } from 'react-dom';

import App from './components/App';


const Demo = () => <App />;

render(<Demo/>, document.querySelector('#demo'))
