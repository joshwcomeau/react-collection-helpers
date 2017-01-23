/* eslint-disable no-unused-vars */
import { expect } from 'chai';
/* eslint-enable */

import rejectBy from './reject-by';

const { describe, context, it } = global;

describe('rejectBy', () => {
  context('with invalid predicates', () => {
    it('throws when a string predicate is supplied', () => {
      const collection = [{ id: 'a', onSale: true }, { id: 'b', onSale: false }];
      const predicate = 'onSale';

      const errorRegex = /invalid predicate/i;
      expect(() => rejectBy({ collection, predicate })).to.throw(errorRegex);
    });

    it('throws when a number predicate is supplied', () => {
      const collection = [{ id: 'a', price: 5 }, { id: 'b', price: 10 }];
      const predicate = 10;

      const errorRegex = /invalid predicate/i;
      expect(() => rejectBy({ collection, predicate })).to.throw(errorRegex);
    });

    it('throws when an array predicate is supplied', () => {
      const collection = ['a', 'b', 'c'];
      const predicate = ['b', 'c'];

      const errorRegex = /invalid predicate/i;
      expect(() => rejectBy({ collection, predicate })).to.throw(errorRegex);
    });
  });

  context('with function predicates', () => {
    it('rejects a single match', () => {
      const collection = [{ id: 'a', onSale: true }, { id: 'b', onSale: false }];
      const predicate = item => item.onSale;

      const expectedResult = [{ id: 'b', onSale: false }];
      const actualResult = rejectBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('rejects no matches', () => {
      const collection = [{ id: 'a', onSale: false }, { id: 'b', onSale: false }];
      const predicate = item => item.onSale;

      const expectedResult = collection;
      const actualResult = rejectBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('rejects all matches', () => {
      const collection = [{ id: 'a', onSale: false }, { id: 'b', onSale: false }];
      const predicate = item => !item.onSale;

      const expectedResult = [];
      const actualResult = rejectBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });

  context('with object predicates', () => {
    it('rejects based on a single property', () => {
      const collection = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
      ];
      const predicate = { onSale: true };

      const expectedResult = [{ id: 'b', onSale: false }];
      const actualResult = rejectBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('rejects based on all properties', () => {
      const collection = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
        { id: 'c', onSale: false },
      ];
      const predicate = { id: 'b', onSale: false };

      const expectedResult = [{ id: 'a', onSale: true }, { id: 'c', onSale: false }];
      const actualResult = rejectBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('rejects no matches when mixing the properties', () => {
      const collection = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
      ];
      const predicate = { id: 'b', onSale: true };

      const expectedResult = collection;
      const actualResult = rejectBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('rejects no matches when the predicate has additional keys', () => {
      const collection = [
        { id: 'a', onSale: true },
        { id: 'b', onSale: false },
      ];
      const predicate = { onSale: true, price: 10 };

      const expectedResult = collection;
      const actualResult = rejectBy({ collection, predicate });

      expect(actualResult).to.deep.equal(expectedResult);
    });
  });
});
