/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import BaseCollectionHelper from './BaseCollectionHelper';
import Filter from '../Filter';

import { clearWhitespace } from '../../helpers/test.helpers';


const { describe, context, it } = global;
const sampleCollection = [
  { id: 'a', name: 'Apple', price: 3.99 },
  { id: 'b', name: 'Banana', price: 5 },
  { id: 'c', name: 'Carrot', price: 3.25 },
];


describe('BaseCollectionHelper', () => {
  context('with a function as children', () => {
    it('renders out the collection, based on children function', () => {
      const wrapper = shallow(
        <BaseCollectionHelper collection={sampleCollection}>
          {item => <div key={item.id}>{item.name}</div>}
        </BaseCollectionHelper>
      );

      const actualOutput = wrapper.html();
      const expectedOutput = clearWhitespace(`
        <div>
          <div>Apple</div>
          <div>Banana</div>
          <div>Carrot</div>
        </div>
      `);

      expect(actualOutput).to.equal(expectedOutput);
    });
  });

  context('with an element as children', () => {
    it('throws when a native element is provided as children', () => {
      const wrapper = shallow.bind(null,
        <BaseCollectionHelper collection={sampleCollection}>
          <div>
            Hi!
          </div>
        </BaseCollectionHelper>
      );

      expect(wrapper).to.throw(/unknown child/);
    });

    it('throws when a composite element is provided as children', () => {
      const Child = ({ children }) => <div>{children}</div>;

      const wrapper = shallow.bind(null,
        <BaseCollectionHelper collection={sampleCollection}>
          <Child>
            Hi!
          </Child>
        </BaseCollectionHelper>
      );

      expect(wrapper).to.throw(/unknown child/);
    });

    it('returns a clone of the child, passing along the collection', () => {
      const wrapper = shallow(
        <BaseCollectionHelper collection={sampleCollection}>
          <Filter predicate={() => true}>
            {item => <div key={item.id}>{item.name}</div>}
          </Filter>
        </BaseCollectionHelper>
      );

      const actualOutput = wrapper.html();
      const expectedOutput = clearWhitespace(`
        <div>
          <div>Apple</div>
          <div>Banana</div>
          <div>Carrot</div>
        </div>
      `);

      expect(actualOutput).to.equal(expectedOutput);
    });
  });

  describe('delegated props', () => {
    it('passes props onto the wrapper div', () => {
      const wrapper = shallow(
        <BaseCollectionHelper
          collection={sampleCollection}
          className="wrapper"
          style={{ padding: 10 }}
        >
          {item => <div key={item.id}>{item.name}</div>}
        </BaseCollectionHelper>
      );

      const actualOutput = wrapper.html();
      const expectedOutput = clearWhitespace(`
        <div class="wrapper" style="padding:10px;">
          <div>Apple</div>
          <div>Banana</div>
          <div>Carrot</div>
        </div>
      `);

      expect(actualOutput).to.equal(expectedOutput);
    });
  });

  describe('wrapper element type', () => {
    it('supports using an alternate DOM node type', () => {
      const wrapper = shallow(
        <BaseCollectionHelper collection={sampleCollection} elementType="ul">
          {item => <li key={item.id}>{item.name}</li>}
        </BaseCollectionHelper>
      );

      const actualOutput = wrapper.html();
      const expectedOutput = clearWhitespace(`
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Carrot</li>
        </ul>
      `);

      expect(actualOutput).to.equal(expectedOutput);
    });

    it('supports using an alternate composite component', () => {
      // eslint-disable-next-line react/prop-types
      const List = ({ children }) => <ul>{children}</ul>;

      const wrapper = shallow(
        <BaseCollectionHelper collection={sampleCollection} elementType={List}>
          {item => <li key={item.id}>{item.name}</li>}
        </BaseCollectionHelper>
      );

      const actualOutput = wrapper.html();
      const expectedOutput = clearWhitespace(`
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Carrot</li>
        </ul>
      `);

      expect(actualOutput).to.equal(expectedOutput);
    });
  });
});
