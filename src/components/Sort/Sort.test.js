/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
/* eslint-enable */

import Sort from '../Sort';

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

  describe('wrapping element', () => {
    it('wraps sorted content in a <div> by default', () => {
      const wrapper = shallow(
        <Sort collection={['hi']}>
          {() => <span />}
        </Sort>
      );

      expect(wrapper.is('div')).to.equal(true);
    });

    it('supports custom element type - DOM node', () => {
      const wrapper = shallow(
        <Sort
          collection={['hi', 'there']}
          elementType="ul"
        >
          {val => <li key={val}>{val}</li>}
        </Sort>
      );

      expect(wrapper.is('ul')).to.be.true;
      expect(wrapper.html()).to.equal('<ul><li>hi</li><li>there</li></ul>');
    });

    it('supports custom element type - composite component', () => {
      // eslint-disable-next-line react/prop-types
      const List = ({ children }) => <ul>{children}</ul>;

      const wrapper = shallow(
        <Sort
          collection={['hi', 'there']}
          elementType={List}
        >
          {val => <li key={val}>{val}</li>}
        </Sort>
      );

      expect(wrapper.is(List)).to.be.true;
      expect(wrapper.html()).to.equal('<ul><li>hi</li><li>there</li></ul>');
    });

    it('delegates props to that wrapper when provided', () => {
      const wrapper = shallow(
        <Sort
          collection={['hi']}
          delegated={{
            className: 'wrapper',
            style: { padding: 10 },
          }}
        >
          {() => <span />}
        </Sort>
      );

      const { className, style } = wrapper.props();

      expect(className).to.equal('wrapper');
      expect(style).to.deep.equal({ padding: 10 });
    });
  });

  describe('sorted children', () => {
    it('sorts by an object property when provided a string', () => {
      const collection = [
        { id: 'b', name: 'Banana' },
        { id: 'a', name: 'Apple' },
        { id: 'c', name: 'Cheese' },
      ];

      const wrapper = shallow(
        <Sort collection={collection} comparator="name">
          {({ id, name }) => <div key={id}>{name}</div>}
        </Sort>
      );

      expect(wrapper.html()).to.equal('<div><div>Apple</div><div>Banana</div><div>Cheese</div></div>');
    });

    it('filters by a compare function', () => {
      // More advanced tests for the filtering logic itself can be found in
      // src/utils/filterBy.test.js
      const collection = [
        { id: 'b', name: 'Banana' },
        { id: 'a', name: 'Apple' },
        { id: 'c', name: 'Cheese' },
      ];

      const wrapper = shallow(
        <Sort
          collection={collection}
          comparator={(a, b) => (a.id < b.id ? -1 : 1)}
        >
          {({ id, name }) => <div key={id}>{name}</div>}
        </Sort>
      );

      expect(wrapper.html()).to.equal('<div><div>Apple</div><div>Banana</div><div>Cheese</div></div>');
    });
  });
});
