# Understanding and Customizing Markup

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


### Single Element Per Chain
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


### Coming Soon: Deprecating This Guide

It's also worth mentioning that Fiber, React's upcoming reconciliation engine, will [allowing components to return arrays](https://twitter.com/threepointone/status/810058843325546496). This means that we won't need to create a wrapping element, and can return collected data completely as-is.

I plan on releasing a major version that accomplishes this once Fiber is released.





> It amuses me that this file name can be read as 'markup dot markdown'
