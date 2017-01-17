import React from 'react';
import { storiesOf } from '@kadira/storybook';

import First from '../First';
import Sort from '../Sort';


storiesOf('First', module)
  .add('default (1 item)', () => (
    <First collection={['Apple', 'Banana', 'Carrot']}>
      {item => <div>{item}</div>}
    </First>
  ))
  .add('first 3 of 4 items', () => (
    <First collection={['Apple', 'Banana', 'Carrot', 'Dragonfruit']} num={3}>
      {item => <div>{item}</div>}
    </First>
  ))
  .add('composed with Sort', () => {
    const collection = [
      { id: 'a', name: 'Apple', price: 5 },
      { id: 'b', name: 'Banana', price: 10.25 },
      { id: 'c', name: 'Carrot', price: 4.50 },
      { id: 'd', name: 'Dragonfruit', price: 7.50 },
      { id: 'e', name: 'Eggplant', price: 12.75 },
    ];

    return (
      <Sort collection={collection} comparator="price">
        <First num={2}>
          {item => <div>{item.name} - {item.price}</div>}
        </First>
      </Sort>
    );
  });
