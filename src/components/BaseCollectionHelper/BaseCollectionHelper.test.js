/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
/* eslint-enable */

import BaseCollectionHelper from './BaseCollectionHelper';
import Filter from '../Filter';
import Sort from '../Sort';

import { clearWhitespace } from '../../helpers/test.helpers';

const { describe, context, it } = global;
describe.only('BaseCollectionHelper', () => {
  const sampleCollection = [
    { id: 'a', name: 'Apple', price: 3.99 },
    { id: 'b', name: 'Banana', price: 5 },
    { id: 'c', name: 'Carrot', price: 3.25 },
  ];

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
    it('returns a clone of the child, passing along the collection', () => {
      // Admittedly, this is a weird way to nest. It's a simplification of a
      // real use-case, though.
      // Because these are the shallow tests, we're just testing prop passing.
      // We check full rendering in the render tests below.
      const wrapper = shallow(
        <BaseCollectionHelper collection={sampleCollection}>
          <BaseCollectionHelper>
            {item => <div key={item.id}>{item.name}</div>}
          </BaseCollectionHelper>
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

  describe('real-world examples', () => {
    it('composes a Filter and a Sort', () => {
      const wrapper = render(
        <Filter collection={sampleCollection} predicate={item => item.price < 5}>
          <Sort comparator="price">
            {item => <div key={item.id}>{item.name}</div>}
          </Sort>
        </Filter>
      );

      const actualOutput = wrapper.html();
      const expectedOutput = clearWhitespace(`
        <div>
          <div>Carrot</div>
          <div>Apple</div>
        </div>
      `);

      expect(actualOutput).to.equal(expectedOutput);
    });
  });
});
