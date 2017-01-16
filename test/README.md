### A Note on Tests

Tests are generally colocated in the directories with the file being tested.

```
|- src
|--|-- components
|--|--|-- Filter
|--|--|--|-- Filter.js
|--|--|--|-- Filter.test.js
|--|-- utils
|--|--|-- filter-by.js
|--|--|-- filter-by.test.js
```

That said, sometimes a test spans multiple files. In these cases, they are placed in this handy test directory. New tests should always be placed next to their primary module, even if they do need to import other modules to make the tests work.
