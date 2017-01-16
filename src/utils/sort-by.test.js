/* eslint-disable no-unused-vars */
import { expect } from 'chai';
/* eslint-enable */

import sortBy from './sort-by';

const { describe, context, it } = global;

describe('sortBy', () => {
  context('with invalid comparators', () => {
    it('throws when an object comparator is supplied', () => {
      const collection = [{ id: 'a', onSale: true }, { id: 'b', onSale: false }];
      const comparator = { id: 'a' };

      const errorRegex = /invalid comparator/i;
      expect(() => sortBy({ collection, comparator })).to.throw(errorRegex);
    });

    it('throws when a number comparator is supplied', () => {
      const collection = [{ id: 'a', price: 5 }, { id: 'b', price: 10 }];
      const comparator = 10;

      const errorRegex = /invalid comparator/i;
      expect(() => sortBy({ collection, comparator })).to.throw(errorRegex);
    });

    it('throws when an array comparator is supplied', () => {
      const collection = ['a', 'b', 'c'];
      const comparator = ['b', 'c'];

      const errorRegex = /invalid comparator/i;
      expect(() => sortBy({ collection, comparator })).to.throw(errorRegex);
    });
  });

  context('with undefined comparator', () => {
    it('sorts strings in ascending order', () => {
      const collection = ['oh', 'hi', 'mark'];

      const expectedResult = ['hi', 'mark', 'oh'];
      const actualResult = sortBy({ collection });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('does not mutate the original array', () => {
      const collection = ['oh', 'hi', 'mark'];
      const collectionClone = collection.slice();

      sortBy({ collection });

      expect(collection).to.deep.equal(collectionClone);
    });
  });

  context('with function comparators', () => {
    it('sorts ascending with an ascending function', () => {
      const collection = [
        { id: 'b', onSale: false },
        { id: 'a', onSale: true },
        { id: 'c', onSale: false },
      ];
      const comparator = (a, b) => (a.id < b.id ? -1 : 1);

      const expectedResult = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
        { id: 'c', onSale: false },
      ];
      const actualResult = sortBy({ collection, comparator });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('sorts descending with a descending function', () => {
      const collection = [
        { id: 'b', onSale: false },
        { id: 'a', onSale: true },
        { id: 'c', onSale: false },
      ];
      const comparator = (a, b) => (a.id < b.id ? 1 : -1);

      const expectedResult = [
        { id: 'c', onSale: false },
        { id: 'b', onSale: false },
        { id: 'a', onSale: true },
      ];
      const actualResult = sortBy({ collection, comparator });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('does not mutate the original array', () => {
      const collection = [
        { id: 'b', onSale: false },
        { id: 'a', onSale: true },
        { id: 'c', onSale: false },
      ];
      const collectionClone = collection.slice();

      const comparator = (a, b) => (a.id < b.id ? 1 : -1);

      sortBy({ collection, comparator });

      expect(collection).to.deep.equal(collectionClone);
    });
  });

  context('with string comparators', () => {
    it('sorts ascending based on the provided property', () => {
      const collection = [
        { id: 'a', price: 5 },
        { id: 'b', price: 10 },
        { id: 'c', price: 7.50 },
      ];
      const comparator = 'price';

      const expectedResult = [
        { id: 'a', price: 5 },
        { id: 'c', price: 7.50 },
        { id: 'b', price: 10 },
      ];
      const actualResult = sortBy({ collection, comparator });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('preserves order of equal items', () => {
      const collection = [
        { id: 'a', price: 5 },
        { id: 'b', price: 10 },
        { id: 'c', price: 10 },
        { id: 'd', price: 7.50 },
        { id: 'e', price: 10 },
      ];
      const comparator = 'price';

      const expectedResult = [
        { id: 'a', price: 5 },
        { id: 'd', price: 7.50 },
        { id: 'b', price: 10 },
        { id: 'c', price: 10 },
        { id: 'e', price: 10 },
      ];
      const actualResult = sortBy({ collection, comparator });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('does not mutate the original array', () => {
      const collection = [
        { id: 'a', price: 5 },
        { id: 'b', price: 10 },
        { id: 'c', price: 7.50 },
      ];
      const collectionClone = collection.slice();

      const comparator = 'price';

      sortBy({ collection, comparator });

      expect(collection).to.deep.equal(collectionClone);
    });
  });
});
