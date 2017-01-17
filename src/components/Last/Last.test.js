/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Last from '../Last';

import { clearWhitespace } from '../../helpers/test.helpers';

const { describe, it } = global;


describe('Last', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Last collection={[]}>
        {() => {}}
      </Last>
    );

    expect(wrapper).to.be.ok;
  });

  it('selects the last item by default', () => {
    const collection = [
      { id: 'a', name: 'Apple' },
      { id: 'b', name: 'Banana' },
      { id: 'c', name: 'Carrot' },
    ];

    const wrapper = shallow(
      <Last collection={collection}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Last>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Carrot</div>
      </div>
    `));
  });

  it('selects the last 3 items when a quantity is specified', () => {
    const collection = [
      { id: 'a', name: 'Apple' },
      { id: 'b', name: 'Banana' },
      { id: 'c', name: 'Carrot' },
      { id: 'd', name: 'Dragonfruit' },
      { id: 'e', name: 'Eggplant' },
    ];

    const wrapper = shallow(
      <Last collection={collection} num={3}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Last>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Carrot</div>
        <div>Dragonfruit</div>
        <div>Eggplant</div>
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
      <Last collection={collection} num={10}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Last>
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
