import React, { PropTypes } from 'react';

import { DISPLAY_NAME_PREFIX } from '../../constants';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Reverse = ({ collection, ...baseProps }) => (
  <BaseCollectionHelper
    collection={collection.slice().reverse()}
    {...baseProps}
  />
);

Reverse.displayName = `${DISPLAY_NAME_PREFIX}Reverse`;

Reverse.propTypes = {
  collection: PropTypes.array,
};

export default Reverse;
