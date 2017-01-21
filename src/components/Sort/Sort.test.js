/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Sort from '../Sort';

import { clearWhitespace } from '../../helpers/test.helpers';

const { describe, it } = global;


describe('Sort', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Sort collection={[]} comparator={() => {}}>
        {() => {}}
      </Sort>
    );

    expect(wrapper).to.be.ok;
  });

  it('sorts by an object property when provided a string', () => {
    const collection = [
      { id: 'b', name: 'Banana' },
      { id: 'a', name: 'Apple' },
      { id: 'c', name: 'Carrot' },
    ];

    const wrapper = shallow(
      <Sort collection={collection} comparator="name">
        {({ id, name }) => <div key={id}>{name}</div>}
      </Sort>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Apple</div>
        <div>Banana</div>
        <div>Carrot</div>
      </div>
    `));
  });

  it('sorts descending by string when specified', () => {
    const collection = [
      { id: 'b', name: 'Banana' },
      { id: 'a', name: 'Apple' },
      { id: 'c', name: 'Carrot' },
    ];

    const wrapper = shallow(
      <Sort descending collection={collection} comparator="name">
        {({ id, name }) => <div key={id}>{name}</div>}
      </Sort>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Carrot</div>
        <div>Banana</div>
        <div>Apple</div>
      </div>
    `));
  })

  it('sorts by a compare function', () => {
    // More advanced tests for the sorting logic itself can be found in
    // src/utils/sort-by.test.js
    const collection = [
      { id: 'b', name: 'Banana' },
      { id: 'a', name: 'Apple' },
      { id: 'c', name: 'Carrot' },
    ];

    const wrapper = shallow(
      <Sort
        collection={collection}
        comparator={(a, b) => (a.id < b.id ? -1 : 1)}
      >
        {({ id, name }) => <div key={id}>{name}</div>}
      </Sort>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Apple</div>
        <div>Banana</div>
        <div>Carrot</div>
      </div>
    `));
  });
});
