/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect } from 'chai';
/* eslint-enable */

import Every from '../Every';

import { clearWhitespace } from '../../helpers/test.helpers';

const { describe, it } = global;


describe('Every', () => {
  it('renders without incident', () => {
    const wrapper = shallow(
      <Every
        collection={[]}
        predicate={() => true}
      >
        {() => {}}
      </Every>
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
      <Every collection={collection} predicate={isLoaded}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Every>
    );

    expect(wrapper.html()).to.equal(null);
  });

  it('returns null if one of the items return false', () => {
    const collection = [
      { id: 'a', name: 'Apple', isLoaded: true },
      { id: 'b', name: 'Banana', isLoaded: true },
      { id: 'c', name: 'Carrot', isLoaded: false },
    ];
    const isLoaded = item => item.isLoaded;

    const wrapper = shallow(
      <Every collection={collection} predicate={isLoaded}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Every>
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
      <Every
        collection={collection}
        predicate={isLoaded}
        fallback={<div>Not Available</div>}
      >
        {({ id, name }) => <div key={id}>{name}</div>}
      </Every>
    );

    expect(wrapper.html()).to.equal('<div>Not Available</div>');
  });

  it('defaults to an is-true predicate', () => {
    const collection = [
      { id: 'a', name: 'Apple', isLoaded: false },
      { id: 'b', name: 'Banana', isLoaded: false },
      { id: 'c', name: 'Carrot', isLoaded: false },
    ];

    const wrapper = shallow(
      <Every collection={collection}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Every>
    );

    expect(wrapper.html()).to.equal(clearWhitespace(`
      <div>
        <div>Apple</div>
        <div>Banana</div>
        <div>Carrot</div>
      </div>
    `));
  });

  it('renders the fallback when no collection is provided', () => {
    const collection = [];
    const isLoaded = item => item.isLoaded;

    const wrapper = shallow(
      <Every collection={collection} predicate={isLoaded}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Every>
    );

    expect(wrapper.html()).to.equal(null);
  });

  it('renders the fallback when no collection AND no predicate is provided', () => {
    const collection = [];

    const wrapper = shallow(
      <Every collection={collection}>
        {({ id, name }) => <div key={id}>{name}</div>}
      </Every>
    );

    expect(wrapper.html()).to.equal(null);
  });

  it('renders the content when all items in the collection are valid', () => {
    const collection = [
      { id: 'a', name: 'Apple', isLoaded: true },
      { id: 'b', name: 'Banana', isLoaded: true },
      { id: 'c', name: 'Carrot', isLoaded: true },
    ];
    const isLoaded = item => item.isLoaded;

    const wrapper = shallow(
      <Every
        collection={collection}
        predicate={isLoaded}
        fallback={<div>Not Available</div>}
      >
        {({ id, name }) => <div key={id}>{name}</div>}
      </Every>
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
