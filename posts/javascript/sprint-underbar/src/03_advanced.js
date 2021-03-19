_.once = function (func) {
  let called = false;
  return function (...args) {
    if (called) return result;
    called = true;
    return result = func(...args);
  };
};


_.delay = function (func, wait, ...args) {
  setTimeout(function() {
    func(...args)
  }, wait);
};

_.memoize = function (func) {
  // TODO: 여기에 코드를 작성합니다.
  return function(...args) {
    func.cache = func.cache || {};
    return func.cache[args]
    ? func.cache[args]
    : func.cache[args] = func(...args)  
  };
};

_.throttle = function (func, wait) {
  let loading;

  return () => {
    if(!loading) {
      loading = setTimeout(() => {
        loading = null;
        func();
      }, wait);
    };
  };
};
  