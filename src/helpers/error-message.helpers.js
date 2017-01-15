import { MODULE_NAME } from '../constants';

export const invalidTypeSuppliedAsPredicate = ({ type, predicate }) => `
>> Error, via ${MODULE_NAME} <<

You supplied an invalid predicate to a <Filter /> component.

Predicates must either be an object or a function. You provided the following ${type}: ${predicate}.
`;
