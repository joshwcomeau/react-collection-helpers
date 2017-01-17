import React, { PropTypes } from 'react';

import '../../polyfills';
import { DISPLAY_NAME_PREFIX } from '../../constants';
import sortBy from '../../utils/sort-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Sort = (props) => {
  const { collection, comparator, ...baseProps } = props;

  const sortedCollection = sortBy({
    collection,
    comparator,
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
};

export default Sort;
