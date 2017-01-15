import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import Filter from '../Filter';


storiesOf('Filter', module)
  .add('Filtering a few items', () => (
    <Filter
      collection={[
        { id: 'a', name: 'apple', inStock: false },
        { id: 'b', name: 'banana', inStock: true },
        { id: 'c', name: 'carrot', inStock: false },
      ]}
      predicate={item => item.inStock}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Filter>
  ))
