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

if (!Array.prototype.some) {
  Array.prototype.some = function(evaluator, thisArg) {
    if (!this) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (typeof(evaluator) !== 'function') {
      if (typeof(evaluator) === 'string') {
        // Attempt to convert it to a function
        if ( ! (evaluator = eval(evaluator)) ){
          throw new TypeError();
        }
      } else {
        throw new TypeError();
      }
    }

    var i;
    if (thisArg===undefined){  // Optimize for thisArg
      for (i in this) {
        if (evaluator(this[i], i, this)) {
          return true;
        }
      }
      return false;
    }
    for (i in this) {
      if (evaluator.call(thisArg, this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
}

if (!Array.prototype.every) {
  Array.prototype.every = function(callbackfn, thisArg) {
    'use strict';
    var T, k;

    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callbackfn !== 'function') {
      throw new TypeError();
    }

    if (arguments.length > 1) {
      T = thisArg;
    }

    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];

        var testResult = callbackfn.call(T, kValue, k, O);

        if (!testResult) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
}

if (!Array.isArray) {
  Array.isArray = arg => (
    Object.prototype.toString.call(arg) === '[object Array]'
  );
}
