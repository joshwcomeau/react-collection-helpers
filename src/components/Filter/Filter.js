import { createElement, isValidElement, cloneElement, PropTypes } from 'react';

import '../../polyfills';
import filterBy from '../../utils/filterBy';

const Filter = ({ children, elementType, collection, predicate, delegated }) => {
  const filteredCollection = filterBy({
    collection,
    predicate,
    component: 'Filter',
  });

  // `children` can either be an element or a function.
  // The function is our standard form.
  // Collection helpers can be composed, and it's when a child helper is used
  // that we expect an element.
  // If it's an element, clone the element and pass it the collection.
  // If it's a function, set the children
  if (isValidElement(children)) {
    // TODO: Check to make sure it's one of ours.
    console.log(children.type.displayName);

    return cloneElement(
      children,
      { collection: filteredCollection }
    );
  }

  return createElement(
    elementType,
    delegated,
    filteredCollection.map(children)
  );
};

Filter.displayName = 'ReactCollectionHelperFilter';

Filter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
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
