/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Reject from './Reject';

const { describe, it } = global;

describe('Reject', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Reject collection={[]} predicate={() => {}}>
        {() => {}}
      </Reject>
    );

    expect(wrapper).to.be.ok;
  });

  it('rejects a list of objects by a predicate function', () => {
    const collection = [
      { id: 'a', name: 'Apple', onSale: false },
      { id: 'b', name: 'Banana', onSale: true },
    ];
    const isOnSale = item => item.onSale;

    const wrapper = shallow(
      <Reject collection={collection} predicate={isOnSale}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Reject>
    );

    expect(wrapper.html()).to.equal('<div><div>Apple</div></div>');
  });

  it('rejects by a predicate match object', () => {
    // More advanced tests for the filtering logic itself can be found in
    // src/utils/filter-by.test.js
    const collection = [
      { id: 'a', name: 'Apple', onSale: false },
      { id: 'b', name: 'Banana', onSale: true },
    ];

    const wrapper = shallow(
      <Reject collection={collection} predicate={{ name: 'Apple' }}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Reject>
    );

    expect(wrapper.html()).to.equal('<div><div>Banana</div></div>');
  });
});
