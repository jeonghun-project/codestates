'use strict';

_.includes = function (arr, target) {
  let has = false;

  _.each(arr, function(ele) {
    if(ele === target) has = true;
  });

  return has;
};

_.every = function (arr, iteratee) {
  let istruthy = true;

  _.each(arr, function(ele) {
    istruthy = iteratee === undefined
    ? ele ? true : false
    : iteratee(ele) ? true : false;
  });

  return istruthy;
};

_.some = function (arr, iteratee) {
  let istruthy;

  if(arr.length === 0) return false;

  _.each(arr, function(ele) {
    istruthy = iteratee === undefined 
    ? ele || istruthy === true ? true : false
    : iteratee(ele) || istruthy === true ? true : false;
  });

  return istruthy;
};

_.extend = function (obj, ...obj1) {

  _.each(obj1, function(ele) {
    _.each(ele, function(val, key) {
      obj[key] = val;
    });
  });

  return obj;
};

_.defaults = function (obj, ...obj1) {

  _.each(obj1, function(ele) {
    _.each(ele, function(val, key) {
      if(obj[key] === undefined) obj[key] = val;
    });
  });

  return obj;
};

_.zip = function (...arr) {
  let maxLength = _.reduce(arr, (acc, ele) => acc.length > ele.length ? acc : ele , arr[0]).length
  let result = Array(maxLength); 
  
  for(let i = 0; i < maxLength; i++) {
    result[i] = _.pluck(arr, i);
  };

  return result;
};

_.zipStrict = function (...arr) {
  let minLength = _.reduce(arr, (acc, ele) => acc.length < ele.length ? acc : ele , arr[0]).length
  let result = Array(minLength); 
  
  for(let i = 0; i < minLength; i++) {
    result[i] = _.pluck(arr, i);
  };

  return result;
};

_.intersection = function (...arr1) {
  let result = [];
  
  result = _.reduce(arr1, function(acc, ele) {
    return _.filter(acc, function(element) {
      return _.includes(ele, element);
    });
  });
  return result;
};

_.difference = function (...arr1) {
  let result = [];
  
  result = _.reduce(arr1, function(acc, ele) {
    return _.filter(acc, function(element) {
      return !_.includes(ele, element);
    });
  });
  return result;
};

_.sortBy = function (arr, transform, order) {
  // TODO: 여기에 코드를 작성합니다.
  let arrCloned = [];
  order = order || 1;
  transform = transform || _.identity;

  arr.sort(function(a, b) {
    if(transform(a) <transform(b)) {
      return -1 * order;
    }
    return order;
  });

  arrCloned = _.map(arr, (arr, idx) => arrCloned[idx] = arr);
  return arrCloned;
};

_.shuffle = function (arr) {
  let arrCloned = arr.slice();

  for (let fromIdx = 0; fromIdx < arr.length; fromIdx++) {
    const toIdx = Math.floor(Math.random() * arr.length);
  
    let temp = arrCloned[fromIdx]
    arrCloned[fromIdx] = arrCloned[toIdx];
    arrCloned[toIdx] = temp;
  };

  return arrCloned;
};
