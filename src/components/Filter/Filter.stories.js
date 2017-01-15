import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import Filter from '../Filter';
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
