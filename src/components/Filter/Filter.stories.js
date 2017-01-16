/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Filter from '../Filter';
import Sort from '../Sort';
import FilterController from '../../helpers/story/FilterController';


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
  .add('With filter controller', () => {
    const ShopItem = ({ name, inStock, taxFree, onSale }) => (
      <div style={{ padding: 10, borderBottom: '1px solid #DDD' }}>
        <strong style={{ display: 'inline-block', width: 100 }}>{name}</strong>
        <span style={{ padding: 10 }}>In stock: {inStock ? '✓' : '×' }</span>
        <span style={{ padding: 10 }}>Tax free: {taxFree ? '✓' : '×' }</span>
        <span style={{ padding: 10 }}>On sale: {onSale ? '✓' : '×' }</span>
      </div>
    );

    return (
      <FilterController
        collection={[
          { id: 'a', name: 'Apple', inStock: true, taxFree: true, onSale: false },
          { id: 'b', name: 'Basketball', inStock: false, taxFree: true, onSale: true },
          { id: 'c', name: 'Carrot', inStock: false, taxFree: false, onSale: true },
          { id: 'd', name: 'Domino', inStock: true, taxFree: false, onSale: true },
          { id: 'e', name: 'Egg', inStock: true, taxFree: false, onSale: true },
          { id: 'f', name: 'Fries', inStock: true, taxFree: true, onSale: true },
        ]}
        filterControls={['inStock', 'taxFree', 'onSale']}
        elementType={ShopItem}
      />
    );
  })
  .add('with nested Sort', () => {
    const collection = [
      { id: 'a', name: 'Apple', price: 5 },
      { id: 'b', name: 'Banana', price: 10.25 },
      { id: 'c', name: 'Carrot', price: 4.50 },
      { id: 'd', name: 'Dragonfruit', price: 7.50 },
      { id: 'e', name: 'Eggplant', price: 12.75 },
    ];

    return (
      <div>
        <h3>Original collection:</h3>
        {collection.map(item => <div>{item.name}, ${item.price}</div>)}

        <h3>Filter out items over $10, sort by price</h3>

        <Filter collection={collection} predicate={item => item.price < 10}>
          <Sort comparator="price">
            {item => <div>{item.name}, ${item.price}</div>}
          </Sort>
        </Filter>
      </div>
    );
  });
