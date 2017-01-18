/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Find from './Find';

const { describe, it } = global;

describe('Find', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Find collection={[]} predicate={() => {}}>
        {() => {}}
      </Find>
    );

    expect(wrapper).to.be.ok;
  });

  it('finds the only matching item via a predicate function', () => {
    const collection = [
      { id: 'a', name: 'Apple', onSale: false },
      { id: 'b', name: 'Banana', onSale: true },
    ];
    const isOnSale = item => item.onSale;

    const wrapper = shallow(
      <Find collection={collection} predicate={isOnSale}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Find>
    );

    expect(wrapper.html()).to.equal('<div><div>Banana</div></div>');
  });

  it('finds the first of many matching items via a predicate function', () => {
    const collection = [
      { id: 'a', name: 'Apple', onSale: false },
      { id: 'b', name: 'Banana', onSale: true },
      { id: 'c', name: 'Carrot', onSale: true },
      { id: 'd', name: 'Dragonfruit', onSale: true },
    ];
    const isOnSale = item => item.onSale;

    const wrapper = shallow(
      <Find collection={collection} predicate={isOnSale}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Find>
    );

    expect(wrapper.html()).to.equal('<div><div>Banana</div></div>');
  });

  it('finds a match using a match object', () => {
    const collection = [
      { id: 'a', name: 'Apple', onSale: true },
      { id: 'b', name: 'Banana', onSale: false },
      { id: 'c', name: 'Carrot', onSale: true },
      { id: 'd', name: 'Dragonfruit', onSale: false },
    ];

    const wrapper = shallow(
      <Find collection={collection} predicate={{ name: 'Carrot' }}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Find>
    );

    expect(wrapper.html()).to.equal('<div><div>Carrot</div></div>');
  });
});
