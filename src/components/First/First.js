import React, { PropTypes } from 'react';

import { DISPLAY_NAME_PREFIX } from '../../constants';

import BaseCollectionHelper from '../BaseCollectionHelper';


const First = ({ collection, num, ...baseProps }) => (
  <BaseCollectionHelper
    collection={collection.slice(0, num)}
    {...baseProps}
  />
);

First.displayName = `${DISPLAY_NAME_PREFIX}First`;

First.propTypes = {
  collection: PropTypes.array,
  num: PropTypes.number.isRequired,
};

First.defaultProps = {
  num: 1,
};

export default First;
