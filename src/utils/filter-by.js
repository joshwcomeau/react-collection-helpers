import { invalidTypeSuppliedAsPredicate } from '../helpers/error-message.helpers';


function efficientFilter(collection, predicate) {
  const matches = [];

  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      matches.push(collection[i]);
    }
  }

  return matches;
}

export default function filterBy({ collection, predicate, component }) {
  // For now, we don't accept predicates that aren't objects or functions.
  const type = Array.isArray(predicate) ? 'array' : typeof predicate;

  switch (type) {
    case 'function':
      return efficientFilter(collection, predicate);

    case 'object':
      // Objects are tricky.
      // Given an array of objects, we want to ensure our predicate object matches
      // all predicate object properties to the array objects.
      // eg. { id: 'a', name: 'apple'}
      //   - should be matched by { name: 'apple' }
      //   - should not be matched by { name: 'orange' }
      //   - should not be matched by { name: 'apple', onSale: true }
      return efficientFilter(collection, item => (
        Object.keys(predicate).every(key => predicate[key] === item[key])
      ));

    default:
      throw new Error(
        invalidTypeSuppliedAsPredicate({ type, predicate, component })
      );
  }
}
