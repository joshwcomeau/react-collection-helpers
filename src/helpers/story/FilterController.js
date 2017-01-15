/* eslint-disable jsx-a11y/label-has-for */
import React, { Component, PropTypes } from 'react';

import Filter from '../../components/Filter';


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
