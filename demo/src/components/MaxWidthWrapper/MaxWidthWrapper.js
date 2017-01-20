import React, { PropTypes } from 'react';

import './MaxWidthWrapper.scss';

const MaxWidthWrapper = ({ children, className, ...props }) => (
  <section className={['MaxWidthWrapper', className].join(' ')} {...props}>
    {children}
  </section>
);

MaxWidthWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MaxWidthWrapper;
