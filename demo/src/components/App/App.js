import React from 'react';

import { Filter, Find, First } from '../../../../src';

import Nav from '../Nav';
import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import HorizontalRule from '../HorizontalRule';
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
    <Nav />
    <MaxWidthWrapper>
      <Header />

      <h4>See It In Action</h4>
      <p>
        Let’s say we’re building a chat application, and we want to show a list of users we can message. We’ve got the following data:
      </p>

      <FiddleEmbed fiddleId="f8eyvge9" panes={['js']} revision={4} />

      <p>
        The first thing we might want to do is filter the list so we only show users who are online. For this, we’ll need our friend, the <ComponentName>Filter</ComponentName> component:
      </p>

      <FiddleEmbed fiddleId="465b0egv" height={225} revision={6}>
        Click the 'Result' pane to see the rendered list.
      </FiddleEmbed>

      <p>
        Our <ComponentName>Filter</ComponentName> is using the following params:
      </p>

      <ol>
        <li>
          <strong className="mono">collection</strong> - the array of items we want to render
        </li>
        <li>
          <strong className="mono">predicate</strong> - a matcher that will determine whether each item will be accepted or rejected. You can pass it a {'function'}, similar to <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">Array#filter</a>, but in this case we’re using the convenient object shorthand format.
          {' '}
          <a href="https://github.com/joshwcomeau/react-collection-helpers/blob/master/documentation/predicates.md">Read more about predicates in React Collection Helpers</a>.
        </li>
        <li>
          <strong className="mono">children</strong> - a {'function'} that decides how to render items that make it through the filter predicate. In this case, we’re rendering a User component for each accepted item.
        </li>
      </ol>

      <p>
        Passing a {'function'} as children is a little unconventional, but it’s a powerful way of giving the developer more control over the children’s output. In our case, you describe how you’d like a <em>single child</em> to look, and we apply that {'function'} to every item in the collection that makes it through the filter.
      </p>


      <h4>Composing</h4>

      <p>
        So we’ve filtered out offline users, but our list is currently being rendered in an arbitrary order. It’d make sense to sort it based on when the current user last spoke to each of their contacts.
      </p>
      <p>
        Thankfully, <strong>React Collection Helpers are composable</strong>. Here’s how we do it, using a <ComponentName>Sort</ComponentName> component:
      </p>

      <FiddleEmbed fiddleId="d3da14hy" height={265} revision={4} />

      <p>
        Nested components have the collections passed through automatically, and just need to define the attributes needed to modify it.
      </p>
      <p>
        The <ComponentName>Sort</ComponentName> component is using the following props:
      </p>

      <ol>
        <li>
          <strong className="mono">collection</strong> - supplied automatically by the parent <ComponentName>Filter</ComponentName> component.
        </li>
        <li>
          <strong className="mono">comparator</strong> - a matcher that will determine how to sort the collection. It accepts a {'function'}, similar to how <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">Array#sort</a> works. In this case, however, we’ve supplied a string shorthand, specifying which property we want to sort by.
          {' '}
          <a href="https://github.com/joshwcomeau/react-collection-helpers/blob/master/documentation/comparators.md">Read more about comparators in React Collection Helpers</a>.

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
        As of the time of writing, there are 10 helper components, and they all compose bi-directionally with each other. The examples in this demo are just a sample of what can currently be done.
      </p>

      <p>
        That said, React Collection Helpers is still in its infancy, and I’m still learning how it can best solve common problems. I suspect we’re still only scratching the surface of what this can be used for.</p>

      <HorizontalRule />

      <p className="contact-info centered">
        Have feedback? Ideas? Criticism? Want to help build this?
        {' '}
        <br />
        I’d love to talk about it.
        {' '}
        <a href="https://github.com/joshwcomeau/react-collection-helpers" className="contact-info">Check out the repo</a>, or <a href="https://twitter.com/JoshWComeau" className="contact-info">hit me up on Twitter</a>.
      </p>
    </MaxWidthWrapper>
  </div>
);

export default App;
