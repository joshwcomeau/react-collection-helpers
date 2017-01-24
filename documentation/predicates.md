# Predicates in React Collection Helpers

Many React Collection Helpers ([`<Filter>`](https://github.com/joshwcomeau/react-collection-helpers#filter), [`<Find>`](https://github.com/joshwcomeau/react-collection-helpers#find), [`<Every>`](https://github.com/joshwcomeau/react-collection-helpers#every), and more) use a `predicate` prop to determine whether an item in a collection matches or not.


### Predicates in general

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

### Predicates in React Collection Helpers

We use predicates in much the same way:

```jsx
const items = [
  { name: 'apple', price: 1.00 },
  { name: 'banana', price: 5.00 },
  { name: 'bugatti veyron', price: 1695000.00 },
]

const isWithinBudgetPredicate = item => item.price < 1000;

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


### Object Short-hand

Instead of passing a function, you can pass it an object that describes your requirement:

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
