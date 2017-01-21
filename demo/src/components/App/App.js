import React from 'react';

import { Filter, Find, First } from '../../../../src';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import ComponentName from '../ComponentName';
import FiddleEmbed from '../FiddleEmbed';
import './App.scss';


const users = [
  {
    id: 'a',
    name: 'Harry Dresden',
    lastMessaged: '2017-01-20T12:34',
    isOnline: false,
  }, {
    id: 'b',
    name: 'Bob',
    lastMessaged: '2016-12-25T00:01',
    isOnline: true,
  }, {
    id: 'c',
    name: 'Molly Carpenter',
    lastMessaged: '2014-03-14T16:32',
    isOnline: false,
  }, {
    id: 'd',
    name: 'Karrin Murphy',
    lastMessaged: '2014-03-14T16:32',
    isOnline: true,
  }, {
    id: 'e',
    name: 'Thomas Raith',
    lastMessaged: '2014-03-14T16:32',
    isOnline: true,
  },
];

const App = ({ children }) => (
  <div className="App">
    <MaxWidthWrapper>
      <Header />

      <h4>See It In Action</h4>
      <p>
        Let’s say we’re building a chat application. We receive the following list of users:
      </p>

      <FiddleEmbed fiddleId="f8eyvge9" panes={['js']} revision={4} />

      <p>
        The first thing we might want to do is filter the list so we only show users who are online. For this, we’ll need our friend, the <ComponentName>Filter</ComponentName> component:
      </p>

      <FiddleEmbed fiddleId="465b0egv" revision={6} />

      <p>Our <ComponentName>Filter</ComponentName> takes 3 params:</p>
      <ol>
        <li>
          <strong className="mono">collection</strong> - the array of items we want to render
        </li>
        <li>
          <strong className="mono">predicate</strong> - a matcher that will determine whether each item will be accepted or rejected. Typically this is defined as a {'function'} that accepts the item as an argument, but here we’re using the convenient object shorthand.
        </li>
        <li>
          <strong className="mono">children</strong> - a {'function'} that decides how to render items that make it through the filter predicate. In this case, we’re rendering a User component for each accepted item.
        </li>
      </ol>

      <p>
        By clicking the 'Result' pane on the code snippet above, you can see that we get a nice list of our currently-online users. The list is rendered in an arbitrary order, though; it’d be nice if it was sorted by the 'lastMessagedAt' property.
      </p>

      <p>
        Thankfully, <strong>React Collection Helpers are composable</strong>. Here’s how we do it:
      </p>

      <FiddleEmbed fiddleId="d3da14hy" revision={3} />

    </MaxWidthWrapper>
  </div>
);

export default App;
