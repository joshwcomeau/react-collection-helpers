/* eslint-disable no-unused-vars */
import { expect } from 'chai';
/* eslint-enable */

import filterBy from './filterBy';

const { describe, context, it } = global;

describe('filterBy', () => {
  context('with invalid predicates', () => {
    it('throws when a string predicate is supplied', () => {
      const collection = [{ id: 'a', onSale: true }, { id: 'b', onSale: false }];
      const predicate = 'onSale';

      const errorRegex = /invalid predicate/i;
      expect(() => filterBy({ collection, predicate })).to.throw(errorRegex);
    });

    it('throws when a number predicate is supplied', () => {
      const collection = [{ id: 'a', price: 5 }, { id: 'b', price: 10 }];
      const predicate = 10;

      const errorRegex = /invalid predicate/i;
      expect(() => filterBy({ collection, predicate })).to.throw(errorRegex);
    });

    it('throws when an array predicate is supplied', () => {
      const collection = ['a', 'b', 'c'];
      const predicate = ['b', 'c'];

      const errorRegex = /invalid predicate/i;
      expect(() => filterBy({ collection, predicate })).to.throw(errorRegex);
    });
  });

  context('with function predicates', () => {
    it('finds a single match', () => {
      const collection = [{ id: 'a', onSale: true }, { id: 'b', onSale: false }];
      const predicate = item => item.onSale;

      const expectedResult = [{ id: 'a', onSale: true }];
      const actualResult = filterBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('finds no matches', () => {
      const collection = [{ id: 'a', onSale: false }, { id: 'b', onSale: false }];
      const predicate = item => item.onSale;

      const expectedResult = [];
      const actualResult = filterBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  context('with object predicates', () => {
    it('matches based on a single property', () => {
      const collection = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
      ];
      const predicate = { onSale: true };

      const expectedResult = [{ id: 'a', onSale: true }];
      const actualResult = filterBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('matches based on all properties', () => {
      const collection = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
      ];
      const predicate = { id: 'b', onSale: false };

      const expectedResult = [predicate];
      const actualResult = filterBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('finds no matches when mixing the properties', () => {
      const collection = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
      ];
      const predicate = { id: 'b', onSale: true };

      const expectedResult = [];
      const actualResult = filterBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('finds no matches when the predicate has additional keys', () => {
      const collection = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
      ];
      const predicate = { onSale: true, price: 10 };

      const expectedResult = [];
      const actualResult = filterBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
