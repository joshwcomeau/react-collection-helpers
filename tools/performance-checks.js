import React, { Component } from 'react';
import Perf from 'react-addons-perf';
import { storiesOf } from '@kadira/storybook';
import { sample, range, random } from 'lodash';

import { Filter, Sort } from '../src'
import './performance-checks.css';

window.Perf = Perf;

const SideAnimation = () => <div className="SideAnimation" />;

const generateItems = n => range(n).map(i => ({
  id: i,
  name: sample(['Anna', 'Ben', 'Carla', 'David', 'Evan']) + i,
  isNice: i % 2 === 0,
}));

storiesOf('Performance checks', module)
  .add('5000-item filter and sort, using Collection Helpers', () => {
    class NiceFriendsWithHelpers extends Component {
      constructor(props) {
        super(props);

        this.state = {
          items: generateItems(5000),
        };
      }

      handleRegeneration() {
        this.setState({
          items: generateItems(5000),
        });
      }

      render() {
        const { items } = this.state;

        return (
          <div>
            <button onClick={() => this.handleRegeneration()}>
              Re-render
            </button>

            <SideAnimation />

            <Filter collection={items} predicate={item => item.isNice}>
              <Sort comparator="name">
                {item => <div key={item.id}>{item.name}</div>}
              </Sort>
            </Filter>
          </div>
        )
      }
    }

    return (
      <NiceFriendsWithHelpers />
    )
  })
  .add('5000-item filter and sort, using vanilla JS', () => {
    class NiceFriendsWithoutHelpers extends Component {
      constructor(props) {
        super(props);

        this.state = {
          items: generateItems(5000),
        };
      }

      handleRegeneration() {
        this.setState({
          items: generateItems(5000),
        });
      }

      render() {
        const { items } = this.state;

        const manipulatedItems = items
          .filter(item => item.isNice)
          .sort((a, b) => {
            const aVal = a.name;
            const bVal = b.name;

            if (aVal === bVal) {
              return 0;
            }

            return aVal < bVal ? -1 : 1;
          });

        return (
          <div>
            <button onClick={() => this.handleRegeneration()}>
              Re-render
            </button>

            <SideAnimation />

            {manipulatedItems.map(item => <div key={item.id}>{item.name}</div>)}
          </div>
        )
      }
    }

    return (
      <NiceFriendsWithoutHelpers />
    )
  });
