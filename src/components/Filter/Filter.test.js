/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
/* eslint-enable */

import Filter from '../Filter';

const { describe, it } = global;

describe('Filter', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Filter collection={[]} predicate={() => {}}>
        {() => {}}
      </Filter>
    );

    expect(wrapper).to.be.ok;
  });

  describe('wrapping element', () => {
    it('wraps filtered content in a <div> by default', () => {
      const wrapper = shallow(
        <Filter collection={['hi']} predicate={{}}>
          {() => <span />}
        </Filter>
      );

      expect(wrapper.is('div')).to.equal(true);
    });

    it('supports custom element type - DOM node', () => {
      const wrapper = shallow(
        <Filter
          collection={['high', 'five']}
          predicate={() => true}
          elementType="ul"
        >
          {val => <li key={val}>{val}</li>}
        </Filter>
      );

      expect(wrapper.is('ul')).to.be.true;
      expect(wrapper.html()).to.equal('<ul><li>high</li><li>five</li></ul>');
    });

    it('supports custom element type - composite component', () => {
      // eslint-disable-next-line react/prop-types
      const List = ({ children }) => <ul>{children}</ul>;

      const wrapper = shallow(
        <Filter
          collection={['high', 'five']}
          predicate={() => true}
          elementType={List}
        >
          {val => <li key={val}>{val}</li>}
        </Filter>
      );

      expect(wrapper.is(List)).to.be.true;
      expect(wrapper.html()).to.equal('<ul><li>high</li><li>five</li></ul>');
    });

    it('delegates props to that wrapper when provided', () => {
      const wrapper = shallow(
        <Filter
          collection={['hi']}
          predicate={{}}
          delegated={{
            className: 'wrapper',
            style: { padding: 10 },
          }}
        >
          {() => <span />}
        </Filter>
      );

      const { className, style } = wrapper.props();

      expect(className).to.equal('wrapper');
      expect(style).to.deep.equal({ padding: 10 });
    });
  });

  describe('filtered children', () => {
    it('filters a list of objects by a predicate function', () => {
      const collection = [
        { id: 'a', name: 'Apple', onSale: false },
        { id: 'b', name: 'Banana', onSale: true },
      ];
      const isOnSale = item => item.onSale;

      const wrapper = shallow(
        <Filter collection={collection} predicate={isOnSale}>
          {({ id, name }) => <div key={id} id={id}>{name}</div>}
        </Filter>
      );

      expect(wrapper.find('#a').length).to.equal(0);
      expect(wrapper.find('#b').length).to.equal(1);
    });

    it('filters by a predicate match object', () => {
      // More advanced tests for the filtering logic itself can be found in
      // src/utils/filterBy.test.js
      const collection = [
        { id: 'a', name: 'Apple', onSale: false },
        { id: 'b', name: 'Banana', onSale: true },
      ];

      const wrapper = shallow(
        <Filter collection={collection} predicate={{ name: 'Apple' }}>
          {({ id, name }) => <div key={id} id={id}>{name}</div>}
        </Filter>
      );

      expect(wrapper.find('#a').length).to.equal(1);
      expect(wrapper.find('#b').length).to.equal(0);
    });
  });
});
