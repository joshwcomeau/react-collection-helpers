/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Some from '../Some';

import { clearWhitespace } from '../../helpers/test.helpers';

const { describe, context, it } = global;


describe('Some', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Some
        collection={[]}
        predicate={() => true}
      >
        {() => {}}
      </Some>
    );

    expect(wrapper).to.be.ok;
  });

  it('returns null if none of the items return true', () => {
    const collection = [
      { id: 'a', name: 'Apple', isLoaded: false },
      { id: 'b', name: 'Banana', isLoaded: false },
      { id: 'c', name: 'Carrot', isLoaded: false },
    ];
    const isLoaded = item => item.isLoaded;

    const wrapper = shallow(
      <Some collection={collection} predicate={isLoaded}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Some>
    );

    expect(wrapper.html()).to.equal(null);
  });

  it('renders fallback content if provided, when collection is invalid', () => {
    const collection = [
      { id: 'a', name: 'Apple', isLoaded: false },
      { id: 'b', name: 'Banana', isLoaded: false },
      { id: 'c', name: 'Carrot', isLoaded: false },
    ];
    const isLoaded = item => item.isLoaded;

    const wrapper = shallow(
      <Some
        collection={collection}
        predicate={isLoaded}
        fallback={<div>Not Available</div>}
      >
        {({ id, name }) => <div key={id}>{name}</div>}
      </Some>
    );

    expect(wrapper.html()).to.equal('<div>Not Available</div>');
  });

  it('renders the content when one item in the collection is valid', () => {
    const collection = [
      { id: 'a', name: 'Apple', isLoaded: true },
      { id: 'b', name: 'Banana', isLoaded: false },
      { id: 'c', name: 'Carrot', isLoaded: false },
    ];
    const isLoaded = item => item.isLoaded;

    const wrapper = shallow(
      <Some
        collection={collection}
        predicate={isLoaded}
        fallback={<div>Not Available</div>}
      >
        {({ id, name }) => <div key={id}>{name}</div>}
      </Some>
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
