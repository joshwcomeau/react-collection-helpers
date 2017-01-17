import React, { PropTypes } from 'react';

import '../../polyfills';
import { DISPLAY_NAME_PREFIX } from '../../constants';

import BaseCollectionHelper from '../BaseCollectionHelper';


// So, this component is a little ridiculous. Our BaseCollectionHelper has
// a built-in map, so we really just need to delegate to this.
// Choosing to make it its own component rather than just an alias for
// consistency with other collection helpers, for predictability when
// debugging.
const Map = props => <BaseCollectionHelper {...props} />;


Map.displayName = `${DISPLAY_NAME_PREFIX}Map`;

Map.propTypes = {
  collection: PropTypes.array,
};

export default Map;
