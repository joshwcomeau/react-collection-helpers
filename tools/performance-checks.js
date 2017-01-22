/*
  This module performs basic performance checks by comparing Collection Helpers
  to their vanilla JS equivalents.

  I've used this for 2 kinds of tests:

  1) Using the Perf react addon.
    - Start storybook by running `npm run storybook`.

    - Navigate in the browser to the storybook, and select the '
      Performance checks' story.

    - Open the developer console, and ensure that the storybook iFrame is
      targeted (should be called 'storybook-preview-iframe', or '<iframe>').

    - Run `Perf.start()` (the Perf module is exposed on the window object).

    - Click the 'Re-render' button.

    - Enter `Perf.stop()` in the developer console.

    - Enter `Perf.printInclusive()` and/or `Perf.printExclusive`.

    - Repeat for the 'vanilla JS' story, located below the Collection Helpers
      story, and compare results.

  On my machine (a retina iMac 27" circa 2014-2015), the inclusive render time
  for Collection Helpers is ~13.5ms, whereas the inclusive render time
  for the native equivalents is ~18.5ms.

  2) Using timeline view, in production

  React-addons-perf only works in development mode. I wanted to test my code
  with React in production mode.

    - Run `npm run build-storybook`, to build a production-ready storybook.

    - Open `./storybook-static/index.html` in your browser. Select the
      'Performance checks' story.

    - Open the devtools, and select the Timeline view. Hit 'record'.

    - Hit the 'Re-render' button 10 times, with a 1-second gap in-between each
      click.

    - Stop the timeline record. Count and average the time of each event
      (the 'Event click' events at the top of each stack).

    - Switch to the vanilla JS, and do a hard refresh (Important! Since JS
      seems to speed up after the first few invocations).

    - Repeat the process for vanilla JS

    On my machine, Collection Helpers average 31.6ms per shuffle, while vanilla
    JS averages 31.8ms. I don't believe that this difference is significant at
    all; they appear to work equally fast.


  # Conclusions

  So, it appears that Collection Helpers are faster in development mode,
  but the difference evaporates in a real, production setting when taking the
  entire render cycle into consideration.

  Ultimately this is great news: Collection Helpers are an abstraction that
  produces more readable code, so it's a relief to see that it doesn't cause
  a performance hit.

  That said, this is hardly an exhaustive test. Please feel free to create
  more elaborate/varied tests, and let me know if you find any interesting
  results!
*/

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
