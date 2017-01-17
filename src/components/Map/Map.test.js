/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Map from '../Map';

import { clearWhitespace } from '../../helpers/test.helpers';

const { describe, it } = global;


describe('Map', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Map collection={[]}>
        {() => {}}
      </Map>
    );

    expect(wrapper).to.be.ok;
  });

  it('maps through a list of objects', () => {
    const collection = [
      { id: 'a', name: 'Apple', onSale: false },
      { id: 'b', name: 'Banana', onSale: true },
    ];

    const wrapper = shallow(
      <Map collection={collection}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Map>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Apple</div>
        <div>Banana</div>
      </div>
    `));
  });
});
