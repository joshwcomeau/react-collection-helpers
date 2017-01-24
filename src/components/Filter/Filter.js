import React, { PropTypes } from 'react';

import { DISPLAY_NAME_PREFIX } from '../../constants';
import filterBy from '../../utils/filter-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Filter = ({ collection, predicate, ...baseProps }) => {
  const filteredCollection = filterBy({
    collection,
    predicate,
    component: 'Filter',
  });

  return (
    <BaseCollectionHelper
      collection={filteredCollection}
      {...baseProps}
    />
  );
};

Filter.displayName = `${DISPLAY_NAME_PREFIX}Filter`;

Filter.propTypes = {
  collection: PropTypes.array,
  predicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default Filter;
