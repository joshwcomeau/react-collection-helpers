import React, { Component, PropTypes } from 'react';

import '../../polyfills';
import { DISPLAY_NAME_PREFIX } from '../../constants';
import filterBy from '../../utils/filter-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Every = ({ collection, predicate, fallback, ...baseProps }) => {
  const filteredCollection = filterBy({
    collection,
    predicate,
    component: 'Every',
  });

  if (filteredCollection.length < collection.length) {
    return fallback || null;
  }

  return (
    <BaseCollectionHelper
      collection={collection}
      {...baseProps}
    />
  );
};

Every.displayName = `${DISPLAY_NAME_PREFIX}Every`;

Every.propTypes = {
  collection: PropTypes.array,
  predicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  fallback: PropTypes.element,
};


export default Every;
