/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import Sort from '../Sort';


storiesOf('Sort', module)
  .add('With flippable sort order', () => {
    const collection = [
      { id: 'a', name: 'Apple', price: 5 },
      { id: 'b', name: 'Banana', price: 10.25 },
      { id: 'c', name: 'Carrot', price: 4.50 },
      { id: 'd', name: 'Dragonfruit', price: 7.50 },
      { id: 'e', name: 'Eggplant', price: 12.75 },
    ];

    class FlippableSorter extends Component {
      constructor(props) {
        super(props);

        this.changeOrder = this.changeOrder.bind(this);

        this.state = {
          order: 'asc',
        };
      }

      changeOrder(ev) {
        console.log({ order: ev.target.id });
        this.setState({ order: ev.target.id });
      }

      render() {
        return (
          <div style={{ fontFamily: 'sans-serif', lineHeight: 1.5 }}>
            <div style={{ padding: 20, borderBottom: '1px solid #CCC' }}>
              <label htmlFor="asc" style={{ marginRight: 30 }}>
                <input
                  id="asc"
                  type="radio"
                  name="sort-order"
                  onChange={this.changeOrder}
                />
                {' '}
                Ascending
              </label>
              <label htmlFor="desc">
                <input
                  id="desc"
                  type="radio"
                  name="sort-order"
                  onChange={this.changeOrder}
                />
                {' '}
                Descending
              </label>
            </div>
            <Sort
              collection={this.props.collection}
              comparator={(a, b) => {
                if (this.state.order === 'asc') {
                  return a.price < b.price ? -1 : 1;
                }

                return a.price < b.price ? 1 : -1;
              }}
              delegated={{
                style: { padding: 20 },
              }}
            >
              {item => <div key={item.id}>{item.name} - ${item.price}</div>}
            </Sort>
          </div>
        );
      }
    }

    return (
      <FlippableSorter collection={collection} />
    );
  });
