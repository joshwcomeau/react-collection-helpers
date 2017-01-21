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

      <FiddleEmbed fiddleId="465b0egv" height={225} revision={6} />

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
        Thankfully, <strong>React Collection Helpers are composable</strong>. Here’s how we do it, using a <ComponentName>Sort</ComponentName> component:
      </p>

      <FiddleEmbed fiddleId="d3da14hy" height={265} revision={4} />

      <p>
        In the author’s humble opinion, it’s here that this set of utility components goes from a novelty to something genuinely useful.
      </p>
      <p>
        Nested components have the collections passed through automatically, and just need to define the attributes needed to modify it.
      </p>
      <p>
        The <ComponentName>Sort</ComponentName> component accepts the following props:
      </p>

      <ol>
        <li>
          <strong className="mono">collection</strong> - supplied automatically by the parent <ComponentName>Filter</ComponentName> component.
        </li>
        <li>
          <strong className="mono">comparator</strong> - a matcher that will determine how to sort the collection. Typically, you would pass it a {'function'}, similar to how <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">Array#sort</a> works. In this case, however, we’ve supplied a string shorthand, specifying which property we want to sort by.
        </li>
        <li>
          <strong className="mono">descending</strong> - by default, when using the 'string' shorthand for <span className="mono">comparator</span>, it will be sorted in ascending order. In this case, we want it sorted in descending order. The <span className="mono">descending</span> boolean prop allows us to make this distinction.
        </li>
      </ol>

      <h4>Conclusion</h4>

      <p>
        React Collection Helpers is an experiment that explores the power of React’s component model. It attempts to allow components to be comprised entirely of easy-to-read, designer-friendly JSX, while still giving developers the full power of Javascript, and without any performance compromises.
      </p>

      <p>
        As of the time of writing, there are 9 Collection Helpers in total. The examples in this demo are just a sample of what can currently be done.
      </p>

      <p>
        That said, React Collection Helpers is still in its infancy, and I’m still learning how it can best solve common problems. I suspect we’re still only scratching the surface of what this can be used for.</p>

      <p>
        Have feedback? Ideas? Criticism? Want to help build this?
        {' '}
        <a href="https://github.com/joshwcomeau/react-collection-helpers">Let’s talk.</a>
      </p>
    </MaxWidthWrapper>
  </div>
);

export default App;
