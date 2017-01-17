/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import First from '../First';

import { clearWhitespace } from '../../helpers/test.helpers';

const { describe, it } = global;


describe('First', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <First collection={[]}>
        {() => {}}
      </First>
    );

    expect(wrapper).to.be.ok;
  });

  it('selects the first item by default', () => {
    const collection = [
      { id: 'a', name: 'Apple' },
      { id: 'b', name: 'Banana' },
      { id: 'c', name: 'Carrot' },
    ];

    const wrapper = shallow(
      <First collection={collection}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </First>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Apple</div>
      </div>
    `));
  });

  it('selects the first 3 items when a quantity is specified', () => {
    const collection = [
      { id: 'a', name: 'Apple' },
      { id: 'b', name: 'Banana' },
      { id: 'c', name: 'Carrot' },
      { id: 'd', name: 'Dragonfruit' },
      { id: 'e', name: 'Eggplant' },
    ];

    const wrapper = shallow(
      <First collection={collection} num={3}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </First>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Apple</div>
        <div>Banana</div>
        <div>Carrot</div>
      </div>
    `));
  });

  it('returns all items when a num higher than the total is provided', () => {
    const collection = [
      { id: 'a', name: 'Apple' },
      { id: 'b', name: 'Banana' },
      { id: 'c', name: 'Carrot' },
      { id: 'd', name: 'Dragonfruit' },
      { id: 'e', name: 'Eggplant' },
    ];

    const wrapper = shallow(
      <First collection={collection} num={10}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </First>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Apple</div>
        <div>Banana</div>
        <div>Carrot</div>
        <div>Dragonfruit</div>
        <div>Eggplant</div>
      </div>
    `));
  });
});
