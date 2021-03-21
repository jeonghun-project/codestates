'use strict';

_.identity = function (val) {
  return val;
};

_.slice = function (arr, start, end) {
  let _start = start || 0, 
    _end = end;

  if (start < 0) _start = Math.max(0, arr.length + start);
  if (end < 0) _end = Math.max(0, arr.length + end);

  if (_end === undefined || _end > arr.length) _end = arr.length;

  let result = [];

  for (let i = _start; i < _end; i++) {
    result.push(arr[i]);
  }

  return result;
};

_.take = function (arr, n) {
  let i = 0;
  let result = [];

  if (n > arr.length) n = arr.length;

  while(i < n) {
    result.push(arr[i]) ;
    i++;
  }

  return result;
};

_.drop = function (arr, n) {
  let result= [];

  if (n === undefined) return arr;
  if (n > arr.length) return result;

  while(n < arr.length) {
    result.push(arr[n]); 
    n++;
  };

  return result;
};

_.last = function (arr, n) {
  let result = [];

  if (n === undefined || n < 0) {result.push(arr[arr.length - 1]); return result;}
  if (n > arr.length) return arr;

  while (arr.length - n < arr.length) {
    result.push(arr[arr.length - n]);
    n--;
  }
  return result;
};

_.each = function (collection, iteratee) {
  let idx = 0;
  if (Array.isArray(collection)) {
    for (let ele of collection) {
      iteratee(ele, idx++, collection);
    };
  } else {
    for (let key in collection) {
      iteratee(collection[key], key, collection);
    };
  }
};

_.indexOf = function (arr, target) {
  let result = -1;

  _.each(arr, function (item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });

  return result;
};

_.filter = function (arr, test) {
  let result = [];

  _.each(arr, function (ele) {
    test(ele) ? result.push(ele) : ''; 
  });

  return result;
};

_.reject = function (arr, test) {
  let result = [];

  _.each(arr, function (ele) {
    test(ele) ? '' : result.push(ele);
  });

  return result;
};


_.uniq = function (arr) {
  let result = [];

  _.each(arr, function(ele) {
    if(_.indexOf(result, ele) === -1) {
      result.push(ele);
    }
  });

  return result;
};

_.map = function (arr, iteratee) {
  let result = [];

  _.each(arr, function (ele, i) {
    result.push(iteratee(ele, i));
  });

  return result;
};

_.pluck = function (arr, keyOrIdx) {
  let result = [];

  result = _.map(arr, function (item) {
    return item[keyOrIdx];
  });

  return result;
};

_.reduce = function (arr, iteratee, initVal) {
  let acc = initVal === undefined ? arr[0] : initVal;

  _.each(arr, function(ele, index) {
    initVal === undefined && index === 0 
    ? ''
    : acc = iteratee(acc, ele, index, arr);
  });

  return acc;
};