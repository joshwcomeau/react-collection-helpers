import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import Every from '../Every';


storiesOf('Every', module)
  .add('With an invalid collection (should be empty)', () => (
    <Every
      collection={[
        { id: 'a', name: 'apple', inStock: false },
        { id: 'b', name: 'banana', inStock: true },
        { id: 'c', name: 'carrot', inStock: false },
      ]}
      predicate={item => item.inStock}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Every>
  ))
  .add('With fallback content for an invalid collection', () => (
    <Every
      collection={[
        { id: 'a', name: 'apple', inStock: false },
        { id: 'b', name: 'banana', inStock: true },
        { id: 'c', name: 'carrot', inStock: false },
      ]}
      predicate={item => item.inStock}
      fallback={<div>Sorry, this collection is invalid.</div>}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Every>
  ))
  .add('With a valid collection', () => (
    <Every
      collection={[
        { id: 'a', name: 'apple', inStock: true },
        { id: 'b', name: 'banana', inStock: true },
        { id: 'c', name: 'carrot', inStock: true },
      ]}
      predicate={item => item.inStock}
      fallback={<div>Sorry, this collection is invalid.</div>}
    >
      {item => <div key={item.id}>{item.name}</div>}
    </Every>
  ));
