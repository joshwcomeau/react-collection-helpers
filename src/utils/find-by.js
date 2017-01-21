import { invalidTypeSuppliedAsPredicate } from '../helpers/error-message.helpers';


function efficientFind(collection, predicate) {
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      return collection[i];
    }
  }
}

// TODO: This function is very similar to `filterBy`.
// They should be combined; I just need to find the right abstraction.
export default function findBy({ collection, predicate, component }) {
  // For now, we don't accept predicates that aren't objects or functions.
  const type = Array.isArray(predicate) ? 'array' : typeof predicate;

  switch (type) {
    case 'function':
      return efficientFind(collection, predicate);

    case 'object':
      // Objects are tricky.
      // Given an array of objects, we want to ensure our predicate object matches
      // all predicate object properties to the array objects.
      // eg. { id: 'a', name: 'apple'}
      //   - should be matched by { name: 'apple' }
      //   - should not be matched by { name: 'orange' }
      //   - should not be matched by { name: 'apple', onSale: true }
      return efficientFind(collection, item => (
        Object.keys(predicate).every(key => predicate[key] === item[key])
      ));

    default:
      throw new Error(
        invalidTypeSuppliedAsPredicate({ type, predicate, component })
      );
  }
}
