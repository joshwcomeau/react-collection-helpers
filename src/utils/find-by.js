import applyPredicateToCollectionWith from './apply-predicate-to-collection-with';


function efficientFind(collection, predicate) {
  for (let i = 0; i < collection.length; i += 1) {
    if (predicate(collection[i])) {
      return collection[i];
    }
  }

  return undefined;
}

export default applyPredicateToCollectionWith(efficientFind);
