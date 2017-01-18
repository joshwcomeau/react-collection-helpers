import React, { Component, PropTypes } from 'react';

import '../../polyfills';
import { DISPLAY_NAME_PREFIX } from '../../constants';
import filterBy from '../../utils/filter-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Some = ({ collection, predicate, fallback, ...baseProps }) => {
  const filteredCollection = filterBy({
    collection,
    predicate,
    component: 'Some',
  });

  if (filteredCollection.length === 0) {
    return fallback || null;
  }

  return (
    <BaseCollectionHelper
      collection={collection}
      {...baseProps}
    />
  );
};

Some.displayName = `${DISPLAY_NAME_PREFIX}Some`;

Some.propTypes = {
  collection: PropTypes.array,
  predicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  fallback: PropTypes.element,
};


export default Some;
