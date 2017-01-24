# Comparators in React Collection Helpers

The [`<Sort>`](https://github.com/joshwcomeau/react-collection-helpers#sort) Collection Helper takes a comparator as an argument. This guide explains how that works, and what's supported.

### Comparators in general

A "comparator" is simply a function that examines two items, and returns a number based on the result of a comparison.

For example, a very basic comparator will sort a list of items in ascending order:

```js
const comparator = (a, b) => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  if (a === b) {
    return 0;
  }
};

const items = [1, 3, 2, 5, 4];

items.sort(comparator);
// -> [1, 2, 3, 4, 5]
```

If we wanted, we could make it sort in descending order simply by inverting the logic related to 1 and -1:

```js
const comparator = (a, b) => {
  if (a < b) {
    return 1;
  }

  if (a > b) {
    return -1;
  }

  if (a === b) {
    return 0;
  }
};

const items = [1, 3, 2, 5, 4];

items.sort(comparator);
// -> [5, 4, 3, 2, 1]
```

### Comparators in React Collection Helpers

We use comparators in much the same way:

```jsx
const ascending = (a, b) => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  if (a === b) {
    return 0;
  }
};

const items = [1, 3, 2, 5, 4];


<Sort collection={items} comparator={ascending}>
  {item => <span key={item}>{item}</span>}
</Sort>
/*
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
  <span>4</span>
  <span>5</span>
</div>
*/
```

A common pattern, especially in React development, is to sort an array of objects based on one of the object properties:

```jsx
const items = [
  { id: 'a', name: 'apple', price: 1 },
  { id: 'b', name: 'banana', price: 5 },
  { id: 'c', name: 'orange', price: 1.50 },
];

const ascendingByPrice = (a, b) => {
  if (a.price < b.price) {
    return -1;
  }

  if (a.price > b.price) {
    return 1;
  }

  if (a.price === b.price) {
    return 0;
  }
};

<Sort collection={items} comparator={ascendingByPrice}>
  {item => <span key={item.id}>${item.price} - {item.name}</span>}
</Sort>
/*
<div>
  <span>$1 - apple</span>
  <span>$1.50 - orange</span>
  <span>$5 - banana</span>
</div>
*/
```

### String Short-hand

Because the above pattern (sorting by an object property) is so common, you can supply a string short-hand as comparator.

Here's how the above example looks, with the short-hand:

```jsx
const items = [
  { id: 'a', name: 'apple', price: 1 },
  { id: 'b', name: 'banana', price: 5 },
  { id: 'c', name: 'orange', price: 1.50 },
];

<Sort collection={items} comparator="price">
  {item => <span key={item.id}>${item.price} - {item.name}</span>}
</Sort>
/*
<div>
  <span>$1 - apple</span>
  <span>$1.50 - orange</span>
  <span>$5 - banana</span>
</div>
*/
```

Simpler, right?

However, what if you wanted to sort _descending_ instead of _ascending_? Using the function comparator you can change the logic, but using the string short-hand, you have less control.

Thankfully, you can add the `descending` prop to specify a descending order, when using the string short-hand:

```jsx
const items = [
  { id: 'a', name: 'apple', price: 1 },
  { id: 'b', name: 'banana', price: 5 },
  { id: 'c', name: 'orange', price: 1.50 },
];

<Sort descending collection={items} comparator="price">
  {item => <span key={item.id}>${item.price} - {item.name}</span>}
</Sort>
/*
<div>
  <span>$5 - banana</span>
  <span>$1.50 - orange</span>
  <span>$1 - apple</span>
</div>
*/
```

The `descending` prop has no effect when used with a function comparator.





> Insert joke about how you can't compare apples and oranges here.
