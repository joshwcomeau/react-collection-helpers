import applyPredicateToCollectionWith from './apply-predicate-to-collection-with';


function efficientFind(collection, predicate) {
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      return collection[i];
    }
  }
}

export default applyPredicateToCollectionWith(efficientFind);
