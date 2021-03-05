if (typeof window === "undefined") {
  var jsdom = require("jsdom");
  var { JSDOM } = jsdom;
  var { document } = new JSDOM("").window;
} // you don't have to worry about this code. this is for testing.

function Dancer(top, left, timeBetweenSteps) {
  // your code here
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.$node = createDancerElement();
  this.step.call(this);
  this.setPosition.call(this, this.top, this.left)
  
}

Dancer.prototype.step = function () {
  setTimeout(this.step.bind(this), Dancer.prototype.timeBetweenSteps);
}

const createDancerElement = function () {
  let elDancer = document.createElement('span');
  elDancer.className = 'dancer';
  return elDancer;
}


Dancer.prototype.setPosition = function (top, left) {
  Object.assign(this.$node.style, {
    top: `${top}px`,
    left: `${left}px`
  });
}