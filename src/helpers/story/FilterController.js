/* eslint-disable jsx-a11y/label-has-for */
import React, { Component, PropTypes } from 'react';

import Filter from '../../components/Filter';


if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      const o = Object(this);

      const len = o.length >>> 0;

      if (len === 0) {
        return false;
      }

      const n = fromIndex | 0;
      let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      while (k < len) {
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      return false;
    },
  });
}


class FilterController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterBy: [],
    };
  }

  updateFilter(key, val) {
    this.setState({
      filterBy: val
        ? [...this.state.filterBy, key]
        : this.state.filterBy.filter(item => item !== key),
    });
  }

  renderFilterControls() {
    return this.props.filterControls.map(name => (
      <label style={{ paddingRight: 20, lineHeight: 2 }}>
        <input
          type="checkbox"
          val={this.state.filterBy.includes(name)}
          onChange={ev => this.updateFilter(name, ev.target.checked)}
        />
        {name}
      </label>
    ));
  }

  render() {
    const predicate = item => (
      this.state.filterBy.every(filterKey => item[filterKey] === true)
    );

    return (
      <div>
        <h4>Filter By</h4>
        <div>
          {this.renderFilterControls()}
        </div>
        <Filter collection={this.props.collection} predicate={predicate}>
          {item => (
            React.createElement(this.props.elementType, { key: item.id, ...item })
          )}
        </Filter>
      </div>
    );
  }
}

FilterController.displayName = 'FilterController';

FilterController.propTypes = {
  filterControls: PropTypes.arrayOf(PropTypes.string),
  collection: PropTypes.array,
  elementType: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

FilterController.defaultProps = {

};

export default FilterController;
