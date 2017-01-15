import React, { PropTypes } from 'react';

import '../../polyfills';
import filterByType from '../../utils/filterByType';

const Filter = ({ collection, predicate, children }) => {
  const filteredCollection = filterByType({ collection, predicate });

  return (
    <div>
      {filteredCollection.map(children)}
    </div>
  );
};

Filter.displayName = 'Filter';

Filter.propTypes = {
  collection: PropTypes.array.isRequired,
  predicate: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  children: PropTypes.func.isRequired,
};

Filter.defaultProps = {

};

export default Filter;
