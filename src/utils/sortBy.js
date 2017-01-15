import { invalidTypeSuppliedAsComparator } from '../helpers/error-message.helpers';

export default function sortBy({ collection, comparator, component }) {
  // For now, we don't accept comparators that aren't objects or functions.
  const type = Array.isArray(comparator) ? 'array' : typeof comparator;

  switch (type) {
    case 'undefined':
      return collection.sort();

    case 'function':
      return collection.sort(comparator);

    case 'string':
      return collection.sort((a, b) => {
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
