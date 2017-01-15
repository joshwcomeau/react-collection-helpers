import React, { Component, PropTypes } from 'react';


const Filter = ({ collection, predicate, children }) => (
  <div>
    {collection.filter(predicate).map(children)}
  </div>
);

Filter.displayName = 'Filter';

Filter.propTypes = {
  collection: PropTypes.array.isRequired,
  predicate: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

Filter.defaultProps = {

};

export default Filter;
