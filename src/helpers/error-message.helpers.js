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
