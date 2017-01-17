/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Filter from '../src/components/Filter';
import Sort from '../src/components/Sort';
import First from '../src/components/First';
import Last from '../src/components/Last';

import { clearWhitespace } from '../src/helpers/test.helpers';


const { describe, it } = global;
const sampleCollection = [
  { id: 'a', name: 'Apple', price: 3.99 },
  { id: 'b', name: 'Banana', price: 5 },
  { id: 'c', name: 'Carrot', price: 3.25 },
  { id: 'd', name: 'Dragonfruit', price: 6.50 },
  { id: 'e', name: 'Eggplant', price: 3 },
];

describe('composition', () => {
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
        <div>Eggplant</div>
        <div>Carrot</div>
        <div>Apple</div>
      </div>
    `);

    expect(actualOutput).to.equal(expectedOutput);
  });

  it('composes a Sort and a Filter', () => {
    // While you likely wouldn't want to do this, it's good to check and make
    // sure that they compose bi-directionally.
    const wrapper = render(
      <Sort collection={sampleCollection} comparator="price">
        <Filter predicate={item => item.price < 5}>
          {item => <div key={item.id}>{item.name}</div>}
        </Filter>
      </Sort>
    );

    const actualOutput = wrapper.html();
    const expectedOutput = clearWhitespace(`
      <div>
        <div>Eggplant</div>
        <div>Carrot</div>
        <div>Apple</div>
      </div>
    `);

    expect(actualOutput).to.equal(expectedOutput);
  });

  it('composes a Filter, Sort, and First', () => {
    const wrapper = render(
      <Sort collection={sampleCollection} comparator="price">
        <Filter predicate={item => item.price < 5}>
          <First num={2}>
            {item => <div key={item.id}>{item.name}</div>}
          </First>
        </Filter>
      </Sort>
    );

    const actualOutput = wrapper.html();
    const expectedOutput = clearWhitespace(`
      <div>
        <div>Eggplant</div>
        <div>Carrot</div>
      </div>
    `);

    expect(actualOutput).to.equal(expectedOutput);
  });

  it('returns no item when a filter returns zero results', () => {
    const wrapper = render(
      <Filter predicate={item => item.price < 0} collection={sampleCollection}>
        <First>
          {item => <div key={item.id}>{item.name}</div>}
        </First>
      </Filter>
    );

    const actualOutput = wrapper.html();
    const expectedOutput = '<div></div>';

    expect(actualOutput).to.equal(expectedOutput);
  });

  it('returns the last of the first', () => {
    const wrapper = render(
      <First num={3} collection={sampleCollection}>
        <Last>
          {item => <div key={item.id}>{item.name}</div>}
        </Last>
      </First>
    );

    const actualOutput = wrapper.html();
    const expectedOutput = clearWhitespace(`
      <div>
        <div>Carrot</div>
      </div>
    `);

    expect(actualOutput).to.equal(expectedOutput);
  });

  it('returns the middle item, with enough <First> and <Last>', () => {
    const wrapper = render(
      <First num={4} collection={sampleCollection}>
        <Last num={3}>
          <First num={2}>
            <Last>
              {item => <div key={item.id}>{item.name}</div>}
            </Last>
          </First>
        </Last>
      </First>
    );

    const actualOutput = wrapper.html();
    const expectedOutput = clearWhitespace(`
      <div>
        <div>Carrot</div>
      </div>
    `);

    expect(actualOutput).to.equal(expectedOutput);
  });
});
