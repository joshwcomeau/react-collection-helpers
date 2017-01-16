import { createElement, isValidElement, cloneElement, PropTypes } from 'react';

import '../../polyfills';


const BaseCollectionHelper = ({ collection, children, elementType, delegated }) => {
  console.log('Invoking', { collection, children, elementType, delegated });
  if (isValidElement(children)) {
    // TODO: Check to make sure it's one of ours.
    console.log(children.type.displayName);

    return cloneElement(
      children,
      { collection }
    );
  }

  return createElement(
    elementType,
    delegated,
    collection.map(children)
  );
};

BaseCollectionHelper.displayName = 'ReactCollectionHelperBase';

BaseCollectionHelper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  elementType: PropTypes.oneOfType([
    PropTypes.string, // For native nodes (eg. 'div')
    PropTypes.func,   // For composite components (eg. TodoListItem)
  ]).isRequired,
  collection: PropTypes.array.isRequired,
  delegated: PropTypes.object,
};

BaseCollectionHelper.defaultProps = {
  elementType: 'div',
};

export default BaseCollectionHelper;
