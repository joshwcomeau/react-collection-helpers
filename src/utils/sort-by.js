import { invalidTypeSuppliedAsComparator } from '../helpers/error-message.helpers';

export default function sortBy({ collection, comparator, component }) {
  // For now, we don't accept comparators that aren't objects or functions.
  const type = Array.isArray(comparator) ? 'array' : typeof comparator;

  // Array#sort is a mutative method. Given that we're supplying it props,
  // we want to ensure we do not mutate it.
  const collectionClone = collection.slice();

  switch (type) {
    case 'undefined':
      return collectionClone.sort();

    case 'function':
      return collectionClone.sort(comparator);

    case 'string':
      return collectionClone.sort((a, b) => {
        const aVal = a[comparator];
        const bVal = b[comparator];

        if (aVal === bVal) {
          return 0;
        }

        return aVal < bVal ? -1 : 1;
      });

    default:
      throw new Error(
        invalidTypeSuppliedAsComparator({ type, comparator, component })
      );
  }
}
