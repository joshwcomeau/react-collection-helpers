import { invalidTypeSuppliedAsPredicate } from '../helpers/error-message.helpers';


export default function applyPredicateToCollectionWith(matcher) {
  return ({ collection, predicate, component }) => {
    // For now, we don't accept predicates that aren't objects or functions.
    const type = Array.isArray(predicate) ? 'array' : typeof predicate;

    switch (type) {
      case 'function':
        return matcher(collection, predicate);

      case 'object':
        return matcher(collection, item => (
          Object.keys(predicate).every(key => predicate[key] === item[key])
        ));

      default:
        throw new Error(
          invalidTypeSuppliedAsPredicate({ type, predicate, component })
        );
    }

  }
}
