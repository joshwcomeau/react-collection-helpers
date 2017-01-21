import applyPredicateToCollectionWith from './apply-predicate-to-collection-with';


function efficientReject(collection, predicate) {
  const matches = [];

  for (let i = 0; i < collection.length; i++) {
    if (!predicate(collection[i])) {
      matches.push(collection[i]);
    }
  }

  return matches;
}

export default applyPredicateToCollectionWith(efficientReject);
