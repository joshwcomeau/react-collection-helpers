import React, { PropTypes } from 'react';

import '../../polyfills';
import { DISPLAY_NAME_PREFIX } from '../../constants';
import findBy from '../../utils/find-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Filter = ({ collection, predicate, ...baseProps }) => {
  const match = findBy({
    collection,
    predicate,
    component: 'Find',
  });

  const matchAsCollection = match ? [match] : [];

  return (
    <BaseCollectionHelper
      collection={matchAsCollection}
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
