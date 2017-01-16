import React, { PropTypes } from 'react';

import '../../polyfills';
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

Sort.displayName = 'ReactCollectionHelperSort';

Sort.propTypes = {
  collection: PropTypes.array.isRequired,
  comparator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default Sort;
