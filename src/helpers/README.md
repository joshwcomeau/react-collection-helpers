# Helpers

Helpers are specific functions designed to help with concrete tasks.

For example, our `error-message` helper contains a suite of error message builders. This is useful to avoid cluttering components up with error message markup, but also to consolidate all error messages in 1 place, so if we decide to add links to a FAQ, we can update them all quickly.

Abstract, general-purpose functions **do not** belong in `helpers`. Instead, `utils` can be used for lodash-style abstract convenience methods.
