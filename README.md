# React Collection Helpers
#### A suite of composable utility components to manipulate collections.

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]



## Quick Example

```jsx
import { Filter, Sort, First } from 'react-collection-helpers';

const users = [
  { id: 'a', name: 'Harry', lastMessagedAt: '2016-03-14T15:00', isOnline: true },
  { id: 'b', name: 'Bob', lastMessagedAt: '2017-01-20T12:00', isOnline: false },
  { id: 'c', name: 'Molly', lastMessagedAt: '2013-01-02T03:04', isOnline: false },
  { id: 'd', name: 'Karrin', lastMessagedAt: '2017-01-12T11:05', isOnline: true },
  { id: 'e', name: 'Thomas', lastMessagedAt: '2014-03-04T13:37', isOnline: true },
]

const UserList = ({ users }) => (
  <Filter collection={users} predicate={{ isOnline: true }}>
    <Sort comparator="lastMessagedAt">
      <First num={4}>
        {user => <div key={user.id}>{user.name}</div>}
      </First>
    </Sort>
  </Filter>
)

ReactDOM.render(
  <UserList users={users}>,
  document.querySelector('#root')
)

/*
  Renders:

  <div>
    <div>Karrin</div>
    <div>Harry</div>
    <div>Thomas</div>
  </div>
*/
```



## Live Demo

[Play with a live demo.](https://joshwcomeau.github.io/react-collection-helpers/demo/dist/)



## Features

- :sparkles: **Useful** - includes 10+ components to help you filter, sort, and slice collections.
- :black_nib: **Designer-friendly** - make your designers' lives easier by writing components without complex inline logic.
- :zap: **Tiny** - full build is only 2.5kb, and is modular so you can import only the components you need.
- :muscle: **Performant** - there is [zero perf cost](https://github.com/joshwcomeau/react-collection-helpers/blob/master/tools/performance-checks.js) to using these components over traditional methods.
- :wrench: **Customizable** - the wrapper element can be any element type you'd like (native _or_ composite), and all non-recognized props are passed through. Composing Collection Helpers does not create additional HTML markup!



## Feedback Wanted

This project is an experiment to test the usefulness of collection manipulators in component form factor.

When I say that it's an experiment, I don't necessarily mean that it's _experimental_. I'm pretty confident that it's stable and safe to use in production; the code is quite simple.

Rather, I mean that I'm not convinced that it solves a real problem. I'd like to hear from users who implement them; does it improve the development experience of you or your team? Do you think the idea has potential if it went in a certain direction? I'm open to exploring tangential ideas.

Let me know on [Twitter](https://twitter.com/joshwcomeau), or [via email](mailto:joshwcomeau@gmail.com)



## Installation

```
npm i -S react-collection-helpers
```

UMD builds are also available via CDN:

- [react-collection-helpers.js](https://unpkg.com/react-collection-helpers@1.1.0/umd/react-collection-helpers.js)
- [react-collection-helpers.min.js](https://unpkg.com/react-collection-helpers@1.1.0/umd/react-collection-helpers.js)

(If you use the UMD build, the global variable is `CollectionHelpers`)




## Usage

Import the component(s) you need:

```jsx
// ES6 modules
import { Find, Every, Map } from 'react-collection-helpers';

// CommonJS
const { Find, Every, Map } = require('react-collection-helpers');
```

Alternatively, you can import components individually, to avoid bundling the components you don't use:

```jsx
// This method avoids bundling unused components, and reduces gzipped bundles
// by about 1kb.
import Find from 'react-collection-helpers/lib/components/Find';
import Every from 'react-collection-helpers/lib/components/Every';
import Map from 'react-collection-helpers/lib/components/Map';
```


## Guides

Learn more about how best to use React Collection Helpers with these in-depth guides:

* [Understanding and Customizing Markup](https://github.com/joshwcomeau/react-collection-helpers/blob/master/documentation/markup.md)
* [Predicates in React Collection Helpers](https://github.com/joshwcomeau/react-collection-helpers/blob/master/documentation/predicates.md)
* [Comparators in React Collection Helpers](https://github.com/joshwcomeau/react-collection-helpers/blob/master/documentation/comparators.md)



## API Reference

### `<Every>`

Render the children if the predicate returns true for **every** child. A Fallback node can be provided, to be rendered if the predicate returns false. Otherwise, nothing will be rendered.

If no predicate is provided, will return true if the collection has 1+ items, and false if the collection is empty.

#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `predicate`  | ✕        | `function`/`object`| See [predicates](https://github.com/joshwcomeau/react-collection-helpers/tree/master/documentation/predicates.md) for more information |
| `fallback`   | ✕        | `node` | Alternate content to be rendered if the predicate returns false on any items.

#### Example

```jsx
const collection = [
  { id: 'a', src: '...', isLoaded: true },
  { id: 'b', src: '...', isLoaded: true },
  { id: 'c', src: '...', isLoaded: false },
];

<Every
  collection={collection}
  predicate={{ isLoaded: true }}
  fallback={<span>Loading...</span>}
>
  {item => <img key={item.id} src={item.src} />}
</Every>
```


### `<Filter>`

Render only the children for which the predicate returns `true`.


#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `predicate`  | ✓        | `function`/`object`| See [predicates](https://github.com/joshwcomeau/react-collection-helpers/tree/master/documentation/predicates.md) for more information |

#### Example

```jsx
const collection = [
  { id: 'a', name: 'apple', price: 1.00 },
  { id: 'b', name: 'banana', price: 5.00 },
  { id: 'c', name: 'carrot', price: 2.50 },
];

<Filter collection={collection} predicate={item => (item.price < 3)}>
  {item => <div key={item.id}>{item.name}</div>}
</Filter>
```


### `<Find>`

Render the first child for which the predicate returns `true`.


#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `predicate`  | ✓        | `function`/`object`| See [predicates](https://github.com/joshwcomeau/react-collection-helpers/tree/master/documentation/predicates.md) for more information |

#### Example

```jsx
const collection = [
  { id: 'a', name: 'John', isAdmin: false },
  { id: 'b', name: 'Jane', isAdmin: true },
  { id: 'c', name: 'Jala', isAdmin: false },
];

<Find collection={collection} predicate={{ isAdmin: true }}>
  {user => <div key={user.id}>Your group's admin is {user.name}</div>}
</Find>
```


### `<First>`

Returns the first 1 or more items of the collection. Generally only useful as a child to another Collection Helper.


#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `num`        | ✕        | `number`| Defaults to `1` |

#### Example

```jsx
const collection = [
  { id: 'a', name: 'John', distance: 3.14 },
  { id: 'b', name: 'Jane', distance: 0.45 },
  { id: 'c', name: 'Jala', distance: 1.23 },
];

<Sort collection={collection} comparator="distance">
  <First>
    {user => <div key={user.id}>You are closest to {user.name}</div>}
  </First>
</Sort>
```


### `<Last>`

Returns the last 1 or more items of the collection. The opposite of `<First>`. Generally only useful as a child to another Collection Helper.


#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `num`        | ✕        | `number`| Defaults to `1` |

#### Example

```jsx
const collection = [
  { id: 'a', name: 'John', distance: 3.14 },
  { id: 'b', name: 'Jane', distance: 0.45 },
  { id: 'c', name: 'Jala', distance: 1.23 },
];

<Sort collection={collection} comparator="distance">
  <Last>
    {user => <div key={user.id}>You are furthest from {user.name}</div>}
  </Last>
</Sort>
```


### `<Map>`

The simplest Collection Helper, doesn't do very much. Can be useful to ensure consistency between your components.

#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers

#### Example

```jsx
const collection = [
  { id: 'a', name: 'John' },
  { id: 'b', name: 'Jane' },
  { id: 'c', name: 'Jala' },
];

<Map collection={collection}>
  {user => <div key={user.id}>{user.name}</div>}
</Map>
```


### `<Reject>`

Render only the children for which the predicate returns `false`. The opposite of `<Filter>`.

#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `predicate`  | ✓        | `function`/`object`| See [predicates](https://github.com/joshwcomeau/react-collection-helpers/tree/master/documentation/predicates.md) for more information |

#### Example

```jsx
const collection = [
  { id: 'a', name: 'apple', price: 1.00 },
  { id: 'b', name: 'banana', price: 5.00 },
  { id: 'c', name: 'carrot', price: 2.50 },
];

<Reject collection={collection} predicate={item => (item.price > 3)}>
  {item => <div key={item.id}>{item.name}</div>}
</Reject>
```


### `<Some>`

Render the children if the predicate returns true for **any** child. A Fallback node can be provided, to be rendered if the predicate returns false. Otherwise, nothing will be rendered.

If no predicate is provided, will return true if the collection has 1+ items, and false if the collection is empty.

#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `predicate`  | ✕        | `function`/`object`| See [predicates](https://github.com/joshwcomeau/react-collection-helpers/tree/master/documentation/predicates.md) for more information |
| `fallback`   | ✕        | `node` | Alternate content to be rendered if the predicate returns false on all items.

#### Example

```jsx
const collection = [
  { id: 'a', username: 'sickskillz', hasWon: false },
  { id: 'b', username: 'dabomb12345', hasWon: false },
];

<Some
  elementType={Leaderboard}
  collection={collection}
  predicate={{ hasWon: true }}
>
  {user => <LeaderboardRow key={user.id} {...user} />}
</Some>
```


### `<Sort>`

Sorts the children based on a comparator.

#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `comparator` | ✓        | `function`/`object`| See [comparators](https://github.com/joshwcomeau/react-collection-helpers/tree/master/documentation/comparators.md) for more information |
| `descending` | ✕        | `boolean` | Whether to sort in descending order, when providing a 'string' comparator. Defaults to `false` (string comparators sort in ascending).

#### Example

```jsx
const collection = [
{ id: 'a', name: 'apple', price: 1.00 },
{ id: 'b', name: 'banana', price: 5.00 },
{ id: 'c', name: 'carrot', price: 2.50 },
];

<Sort collection={collection} comparator="price">
  {item => <StoreItem key={item.id} {...item} />}
</Sort>
```






<!-- Populate references above -->
[build-badge]: https://img.shields.io/travis/joshwcomeau/react-collection-helpers/master.png?style=flat-square
[build]: https://travis-ci.org/joshwcomeau/react-collection-helpers

[npm-badge]: https://img.shields.io/npm/v/react-collection-helpers.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-collection-helpers

[coveralls-badge]: https://img.shields.io/coveralls/joshwcomeau/react-collection-helpers/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/joshwcomeau/react-collection-helpers
