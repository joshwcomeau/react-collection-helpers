import React, { PropTypes } from 'react';

import './ComponentName.scss';


const ComponentName = ({ children }) => (
  <a
    href={`https://github.com/joshwcomeau/react-collection-helpers#${children.toLowerCase()}`}
    className="ComponentName"
  >
    {`<${children}>`}
  </a>
);

ComponentName.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ComponentName;
