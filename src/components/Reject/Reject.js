import React, { PropTypes } from 'react';

import { DISPLAY_NAME_PREFIX } from '../../constants';
import rejectBy from '../../utils/reject-by';

import BaseCollectionHelper from '../BaseCollectionHelper';


const Reject = ({ collection, predicate, ...baseProps }) => {
  const filteredCollection = rejectBy({
    collection,
    predicate,
    component: 'Reject',
  });

  return (
    <BaseCollectionHelper
      collection={filteredCollection}
      {...baseProps}
    />
  );
};

Reject.displayName = `${DISPLAY_NAME_PREFIX}Reject`;

Reject.propTypes = {
  collection: PropTypes.array,
  predicate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default Reject;
