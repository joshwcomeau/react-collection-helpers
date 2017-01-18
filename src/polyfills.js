/* eslint-disable */
if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const list = Object(this);
    const length = list.length >>> 0;
    const thisArg = arguments[1];
    let value;

    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      const o = Object(this);

      const len = o.length >>> 0;

      if (len === 0) {
        return false;
      }

      const n = fromIndex | 0;
      let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      while (k < len) {
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      return false;
    },
  });
}
