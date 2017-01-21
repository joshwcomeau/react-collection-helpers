/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Find from '../Find';
import Sort from '../Sort';


storiesOf('Find', module)
  .add('default (finds the first match)', () => (
    <Find
      collection={[
        { id: 'a', name: 'apple', inStock: false },
        { id: 'b', name: 'banana', inStock: true },
        { id: 'c', name: 'carrot', inStock: true },
      ]}
      predicate={item => item.inStock}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Find>
  ));
