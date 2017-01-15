import { createElement, PropTypes } from 'react';

import '../../polyfills';


const Sort = ({ children, elementType, collection, by, delegated }) => {
  return createElement(
    elementType,
    delegated,
    collection.sort(by).map(children)
  );
};

Sort.propTypes = {
  children: PropTypes.func.isRequired,
  elementType: PropTypes.oneOfType([
    PropTypes.string, // For native nodes (eg. 'div')
    PropTypes.func,   // For composite components (eg. TodoListItem)
  ]).isRequired,
  collection: PropTypes.array.isRequired,
  by: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  delegated: PropTypes.object,
};

Sort.defaultProps = {
  elementType: 'div',
};

export default Sort;
