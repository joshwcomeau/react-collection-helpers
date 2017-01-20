import React from 'react';

import { Filter, Find, First } from '../../../../src';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
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
      <FiddleEmbed fiddleId="f8eyvge9" />

      <p>
        The first thing we might want to do is filter the list so we only show users who are online. For this, we'll need our friend, the {'<Filter>'} component.
      </p>
    </MaxWidthWrapper>
  </div>
);

export default App;
