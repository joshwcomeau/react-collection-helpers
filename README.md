# React Collection Helpers
#### A suite of composable utility components to manipulate collections. Make JSX Clean Again.

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## Quick Example

```js
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


## API Reference

### `<Every>`

Render the children if the predicate returns true for **every** child. A Fallback node can be provided, to be rendered if the predicate returns false. Otherwise, nothing will be rendered.


#### Props

| Prop         | Required           | Types   | Default | Notes    |
|--------------|--------------------|---------|---------|----------|
| `collection` | :heavy_check_mark: | [`any`] | `undefined`  | Can be implicitly passed by parent Collection Helpers
| `predicate`  | :heavy_check_mark: | `function`/`object`| `undefined` | See [predicates](#predicates) for more information |
| `fallback`   | :heavy_multiplication_x: | `node` | `undefined` | Alternate content to be rendered if the predicate returns false on any items.

#### Example

```js
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
