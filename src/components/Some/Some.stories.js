import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Some from '../Some';


storiesOf('Some', module)
  .add('With an invalid collection (should be empty)', () => (
    <Some
      collection={[
        { id: 'a', name: 'apple', inStock: false },
        { id: 'b', name: 'banana', inStock: false },
        { id: 'c', name: 'carrot', inStock: false },
      ]}
      predicate={item => item.inStock}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Some>
  ))
  .add('With fallback content for an invalid collection', () => (
    <Some
      collection={[
        { id: 'a', name: 'apple', inStock: false },
        { id: 'b', name: 'banana', inStock: false },
        { id: 'c', name: 'carrot', inStock: false },
      ]}
      predicate={item => item.inStock}
      fallback={<div>Sorry, this collection is invalid.</div>}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Some>
  ))
  .add('With a single valid item', () => (
    <Some
      collection={[
        { id: 'a', name: 'apple', inStock: true },
        { id: 'b', name: 'banana', inStock: false },
        { id: 'c', name: 'carrot', inStock: false },
      ]}
      predicate={item => item.inStock}
      fallback={<div>Sorry, this collection is invalid.</div>}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Some>
  ));
