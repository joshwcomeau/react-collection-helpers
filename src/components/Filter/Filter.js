import React, { PropTypes } from 'react';

import '../../polyfills';
import filterBy from '../../utils/filterBy';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Filter = (props) => {
  const { collection, predicate, ...baseProps } = props;

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

Filter.displayName = 'ReactCollectionHelperFilter';

Filter.propTypes = {
  collection: PropTypes.array.isRequired,
  predicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default Filter;
