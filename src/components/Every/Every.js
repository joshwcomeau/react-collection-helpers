import React, { Component, PropTypes } from 'react';

import { DISPLAY_NAME_PREFIX } from '../../constants';
import filterBy from '../../utils/filter-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


// This can't be an SFC because it has the potential to return `null`.
class Every extends Component {
  render() {
    const { collection, predicate, fallback, ...baseProps } = this.props;

    const filteredCollection = filterBy({
      collection,
      predicate,
      component: 'Every',
    });

    const isEmpty = collection.length === 0;
    const notAllMatch = filteredCollection.length < collection.length;

    if (isEmpty || notAllMatch) {
      return fallback;
    }

    return (
      <BaseCollectionHelper
        collection={collection}
        {...baseProps}
      />
    );
  }
}

Every.displayName = `${DISPLAY_NAME_PREFIX}Every`;

Every.propTypes = {
  collection: PropTypes.array,
  predicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  fallback: PropTypes.element,
};

Every.defaultProps = {
  // Default to an always-true predicate, so it can be used to check for non-
  // empty collections.
  predicate: () => true,
  fallback: null,
};


export default Every;
