import React, { PropTypes } from 'react';

import '../../polyfills';
import { DISPLAY_NAME_PREFIX } from '../../constants';
import sortBy from '../../utils/sort-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Sort = ({ collection, comparator, descending, ...baseProps }) => {
  const sortedCollection = sortBy({
    collection,
    comparator,
    descending,
    component: 'Sort',
  });

  return (
    <BaseCollectionHelper
      collection={sortedCollection}
      {...baseProps}
    />
  );
};

Sort.displayName = `${DISPLAY_NAME_PREFIX}Sort`;

Sort.propTypes = {
  collection: PropTypes.array,
  comparator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  descending: PropTypes.bool,
};

export default Sort;
