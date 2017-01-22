# React Collection Helpers
#### A suite of composable utility components to manipulate collections. Make JSX Clean Again.

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



## Demo

[See a live, editable demo.](TODO)



## Features

- :sparkles: **Useful** - includes 10+ components to help you filter, sort, and slice collections.
- :black_nib: **Designer-friendly** - Make your designers' lives easier by having functional components without complex inline logic.
- :zap: **Tiny** - full build is only 2.5kb, and is modular so you can import only the components you need.
- :muscle: **Performant** - stress tests have shown that there is zero perf cost to using these components over traditional methods.
- :wrench: **Customizable** - The wrapper element can be any element type you'd like (native _or_ composite), and all non-recognized props are passed through. Composing Collection Helpers does not create additional HTML markup!



## Installation

```
npm i -S react-collection-helpers
```

UMD builds are also available via CDN:

- [react-collection-helpers.js](https://unpkg.com/react-collection-helpers@1.1.0/umd/react-collection-helpers.js)
- [react-collection-helpers.min.js](https://unpkg.com/react-collection-helpers@1.1.0/umd/react-collection-helpers.js)

(If you use the UMD build, the global variable is `CollectionHelpers`)




## Usage

### Importing
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
import Find from 'react-collection-helpers/Find';
import Every from 'react-collection-helpers/Every';
import Map from 'react-collection-helpers/Map';
```

### Understanding and Customizing Markup

React Collection Helpers will create a wrapping element. For example:

```jsx
<ul className="list">
  <Filter collection={collection} predicate={predicate}>
    {item => <li>{item}</li>}
  </Filter>
</ul>
```
... becomes ...
```html
<ul class="list">
  <div> <!-- oh no! -->
    <li>...</li>
  </div>
</ul>
```

This isn't good! Fortunately, there is a solution: you can _customize the element type_, as well as _delegate any props to the wrapping element_.

The above example could be rewritten as:

```jsx
<Filter className="list" elementType="ul" collection={collection} predicate={predicate}>
  {item => <li>{item}</li>}
</Filter>
```
```html
<ul class="list">
  <li>...</li>
</ul>
```


We're specifying that the <Filter> should return a `<ul>` instead of the default `<div>`, and we're applying a class name. This allows it to play nice with grid systems, since you can define Collection Helpers as rows.

You can even supply a composite component to use as wrapper:

```jsx
<Filter elementType={CustomList} collection={collection} predicate={predicate}>
  {item => <li>{item}</li>}
</Filter>
```

Another thing to note: **Only the bottom-most helper in a chain of helpers will create a wrapping element.** For example:

```jsx
<Filter collection={collection} predicate={predicate}>
  <Sort className="sort">
    {item => <div>{item}</div>}
  </Sort>
</Filter>
```
```html
<ul class="sort">
  <div>...</div>
</ul>
```

It's also worth mentioning that Fiber, React's upcoming reconciliation engine, will _remove this requirement_, by [allowing components to return arrays](https://twitter.com/threepointone/status/810058843325546496). In a future major version of React Collection Helpers, expect to not have any additional markup created.



### Predicates

Many React Collection Helpers ([`<Filter>`](#filter), [`<Find>`](#find), [`<Every>`](#every), and more) use a `predicate` prop to determine whether an item in a collection matches or not.

Don't let the word `predicate` scare you. A predicate is simply a function that returns a boolean value.

For example, the following predicate will allow us to determine whether an item in a list is within our budget:

```jsx
const items = [
  { name: 'apple', price: 1.00 },
  { name: 'banana', price: 5.00 },
  { name: 'bugatti veyron', price: 1695000.00 },
]

const isWithinBudgetPredicate = item => item.price < 1000;
```

In this ridiculous example, we have a thousand bucks, so we can afford some fruit but not a supercar.

We can apply this predicate with several different functions, in vanilla JS:

```jsx
const allAffordableItems = items.filter(isWithinBudgetPredicate);
// -> [{ name: 'apple', price: 1.00 }, { name: 'banana', price: 5.00 }]

const firstAffordableItem = items.find(isWithinBudgetPredicate);
// -> { name: 'apple', price: 1.00 }
```

In React Collection Helpers, it works much the same way:

```jsx
<Filter collection={items} predicate={isWithinBudgetPredicate}>
  {item => <div key={item.name}>{item.name} - ${item.price}</div>}
</Filter>
/*
<div>
  <div>apple - $1.00</div>
  <div>banana - $5.00</div>
</div>
*/

<Find collection={items} predicate={isWithinBudgetPredicate}>
  {item => <div key={item.name}>{item.name} - ${item.price}</div>}
</Find>
/*
<div>
  <div>apple - $1.00</div>
</div>
*/
```

**Object short-hand**: Instead of passing a function, you can pass it an object that describes your requirement:

```jsx
const items = [
  { name: 'apple', price: 1.00, isOnSale: false },
  { name: 'banana', price: 2.50,  isOnSale: true },
  { name: 'bugatti veyron', price: 500000, isOnSale: true },
];

<Filter collection={items} predicate={{ isOnSale: true }}>
  {item => <div key={item.name}>{item.name} - ${item.price}</div>}
</Filter>

/*
<div>
  <div>banana - $2.50</div>
  <div>bugatti veyron - $500000</div>
</div>
*/

```

This is often a more declarative way to present a predicate, if you're testing for a specific object value. Under the hood, it creates a predicate function based on this object and applies it in the same way.




## API Reference

### `<Every>`

Render the children if the predicate returns true for **every** child. A Fallback node can be provided, to be rendered if the predicate returns false. Otherwise, nothing will be rendered.

#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `predicate`  | ✓        | `function`/`object`| See [predicates](#predicates) for more information |
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
  {child => <img key={child.id} src={child.src} />}
</Every>
```


### `<Filter>`

Render only the children for which the predicate returns `true`.


#### Props

| Prop         | Required | Types   | Notes    |
|--------------|----------|---------|----------|
| `collection` | ✓        | [`any`] | Can be implicitly passed by parent Collection Helpers
| `predicate`  | ✓        | `function`/`object`| See [predicates](#predicates) for more information |

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
  {child => <img key={child.id} src={child.src} />}
</Every>
```


<!-- Populate references above -->
[build-badge]: https://img.shields.io/travis/joshwcomeau/react-collection-helpers/master.png?style=flat-square
[build]: https://travis-ci.org/joshwcomeau/react-collection-helpers

[npm-badge]: https://img.shields.io/npm/v/react-collection-helpers.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-collection-helpers

[coveralls-badge]: https://img.shields.io/coveralls/joshwcomeau/react-collection-helpers/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/joshwcomeau/react-collection-helpers
