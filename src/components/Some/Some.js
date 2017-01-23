import React, { PropTypes } from 'react';

import '../../polyfills';
import { DISPLAY_NAME_PREFIX } from '../../constants';
import findBy from '../../utils/find-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Some = ({ collection, predicate, fallback, ...baseProps }) => {
  const match = findBy({
    collection,
    predicate,
    component: 'Some',
  });

  if (!match) {
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
  ]),
  fallback: PropTypes.element,
};

Some.defaultProps = {
  // Default to an always-true predicate, so it can be used to check for non-
  // empty collections.
  predicate: () => true,
};


export default Some;
