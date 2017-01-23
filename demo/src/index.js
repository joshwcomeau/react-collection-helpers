import React from 'react';
import { render } from 'react-dom';

import App from './components/App';


const Demo = () => <App />;

// eslint-disable-next-line no-undef
render(<Demo />, document.querySelector('#demo'));
