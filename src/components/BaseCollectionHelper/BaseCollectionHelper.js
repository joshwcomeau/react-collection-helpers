import { createElement, isValidElement, cloneElement, PropTypes } from 'react';

import { isCollectionHelper } from '../../helpers/misc.helpers';
import {
  unknownChildPassedToCollectionHelper,
} from '../../helpers/error-message.helpers';


const BaseCollectionHelper = ({ collection, children, elementType, ...delegated }) => {
  if (isValidElement(children)) {
    // Check to make sure it's one of ours.
    if (!isCollectionHelper(children)) {
      throw new Error(unknownChildPassedToCollectionHelper(children));
    }

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
};

BaseCollectionHelper.defaultProps = {
  elementType: 'div',
};

export default BaseCollectionHelper;
