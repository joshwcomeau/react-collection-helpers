import applyPredicateToCollectionWith from './apply-predicate-to-collection-with';


function efficientFilter(collection, predicate) {
  const matches = [];

  for (let i = 0; i < collection.length; i += 1) {
    if (predicate(collection[i])) {
      matches.push(collection[i]);
    }
  }

  return matches;
}

export default applyPredicateToCollectionWith(efficientFilter);
