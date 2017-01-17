/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Reverse from '../Reverse';

import { clearWhitespace } from '../../helpers/test.helpers';

const { describe, context, it } = global;


describe('Reverse', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Reverse collection={[]}>
        {() => {}}
      </Reverse>
    );

    expect(wrapper).to.be.ok;
  });

  it('reverses the collection provided', () => {
    const collection = [
      { id: 'a', name: 'Apple' },
      { id: 'b', name: 'Banana' },
      { id: 'c', name: 'Carrot' },
    ];

    const wrapper = shallow(
      <Reverse collection={collection}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Reverse>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Carrot</div>
        <div>Banana</div>
        <div>Apple</div>
      </div>
    `));
  })
});
