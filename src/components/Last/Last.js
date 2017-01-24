import React, { PropTypes } from 'react';

import { DISPLAY_NAME_PREFIX } from '../../constants';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Last = ({ collection, num, ...baseProps }) => (
  <BaseCollectionHelper
    collection={collection.slice(num * -1)}
    {...baseProps}
  />
);

Last.displayName = `${DISPLAY_NAME_PREFIX}Last`;

Last.propTypes = {
  collection: PropTypes.array,
  num: PropTypes.number.isRequired,
};

Last.defaultProps = {
  num: 1,
};

export default Last;
