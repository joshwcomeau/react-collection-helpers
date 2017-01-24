import React, { Component, PropTypes } from 'react';

import { DISPLAY_NAME_PREFIX } from '../../constants';
import findBy from '../../utils/find-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


// This can't be an SFC because it has the potential to return `null`.
class Some extends Component {
  render() {
    const { collection, predicate, fallback, ...baseProps } = this.props;

    const match = findBy({
      collection,
      predicate,
      component: 'Some',
    });

    if (!match) {
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
  fallback: null,
};


export default Some;
