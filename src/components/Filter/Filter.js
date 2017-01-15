import { createElement, PropTypes } from 'react';

import '../../polyfills';
import filterBy from '../../utils/filterBy';

const Filter = ({ children, elementType, collection, predicate, delegated }) => {
  const filteredCollection = filterBy({
    collection,
    predicate,
    component: 'Filter',
  });

  return createElement(
    elementType,
    delegated,
    filteredCollection.map(children)
  );
};

Filter.displayName = 'Filter';

Filter.propTypes = {
  children: PropTypes.func.isRequired,
  elementType: PropTypes.oneOfType([
    PropTypes.string, // For native nodes (eg. 'div')
    PropTypes.func,   // For composite components (eg. TodoListItem)
  ]).isRequired,
  collection: PropTypes.array.isRequired,
  predicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  delegated: PropTypes.object,
};

Filter.defaultProps = {
  elementType: 'div',
};

export default Filter;
