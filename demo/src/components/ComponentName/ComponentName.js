import React, { PropTypes } from 'react';

import './ComponentName.scss';


const ComponentName = ({ children }) => (
  <span className="ComponentName">{`<${children}>`}</span>
);

ComponentName.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ComponentName;
