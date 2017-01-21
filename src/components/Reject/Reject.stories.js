/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Reject from '../Reject';
import Sort from '../Sort';


storiesOf('Reject', module)
  .add('default', () => (
    <Reject
      collection={[
        { id: 'a', name: 'apple', inStock: false },
        { id: 'b', name: 'banana', inStock: true },
        { id: 'c', name: 'carrot', inStock: false },
      ]}
      predicate={item => item.inStock}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Reject>
  ));
