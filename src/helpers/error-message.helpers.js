import { MODULE_NAME } from '../constants';

export const invalidTypeSuppliedAsPredicate = ({ type, predicate, component }) => `
>> Error, via ${MODULE_NAME} <<

You supplied an invalid predicate.

Predicates must either be an object or a function. You provided the following ${type}: ${predicate}.

Check the render method of <${component}>.
`;

export const invalidTypeSuppliedAsComparator = ({ type, comparator, component }) => `
>> Error, via ${MODULE_NAME} <<

You supplied an invalid comparator.

Predicates must either be a string or a function. You provided the following ${type}: ${comparator}.

Check the render method of <${component}>.
`;

export const unknownChildPassedToCollectionHelper = ({ children, parentComponent }) => `
>> Error, via ${MODULE_NAME} <<

You supplied an unknown child to a Collection Helper.

Collection Helpers take very specific children. Please supply 1 of the 2 following types:

1. a function:

    <Filter>
      {item => <div>{item.name}</div>}
    </Filter>

2. another Collection Helper:

    <Filter>
      <Sort>
        {item => <div>{item.name}</div>}
      </Sort>
    </Filter>

You supplied: ${children}.

Check the render method of <${parentComponent}>.
`;
