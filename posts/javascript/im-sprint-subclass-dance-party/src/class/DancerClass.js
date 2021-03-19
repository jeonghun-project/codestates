if (typeof window === 'undefined') {
  var jsdom = require('jsdom');
  var { JSDOM } = jsdom;
  var { document } = (new JSDOM('')).window;
} // you don't have to worry about this code. this is for testing.

let mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class DancerClass {
  constructor(top = 0, left = 0, timeBetweenSteps = 0, speedx = 0, speedy = 0, radius) {
    this.top = Math.floor(top);
    this.left = left;
    this.timeBetweenSteps = timeBetweenSteps;
    this.speedx = speedx;
    this.speedy = speedy;
    this.radius = radius;
    this.minradius = radius;
    this.$node = (function () {
      let elDancer = document.createElement('span');
      elDancer.className = 'dancer';
      return elDancer;
    })();
    this.isClick = false;
    this.step()
    this.setPosition();
    this.addDancerEvent(this.handleDancerClick.bind(this));
  }
  
  step () {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }

  addDancerEvent(eventFn) {
    this.$node.addEventListener('click', eventFn);
  }

  handleDancerClick () {
    this.click = true;
    this.setPosition.call(this);
  }

  update() {
    if (this.left + this.radius > innerWidth || this.left - this.radius < 0) {
      this.speedx = -this.speedx;   
    }

    if (this.top + this.radius > innerHeight || this.top - this.radius < 0) {
      this.speedy = -this.speedy;   
    }
    this.left += this.speedx;
    this.top += this.speedy;
    
    if (mouse.x - this.left < 50 && 
        mouse.x - this.left > -50 &&
        mouse.y - this.top < 50 &&
        mouse.y - this.top > -50) {
      if (this.radius < 40) {
        this.radius += 1;
      }
    } else if (this.radius > this.minradius) {
      this.radius -= 1;        
    }
    
    this.setPosition.call(this);
  }

  setPosition () {
    if(!this.click) {
      Object.assign(this.$node.style, {
        top : `${this.top}px`,
        left : `${this.left}px`,
        borderRadius : `${this.radius}px`,
        borderWidth : `${this.radius}px`
      });
    } else {
      Object.assign(this.$node.style, {
        top : `${this.top}px`,
        left : `${this.left}px`,
        width : `0`,
        height : `0`,
        borderLeft : `${this.radius}px solid transparent`,
        borderRight : `${this.radius}px solid transparent`,
        borderBottom : `${this.radius}px solid transparent`,
        borderRadius : `0px`,
        borderWidth : `${this.radius}px`
      });
    }
  }

  render (target) {
    target.appendChild(this.$node);
  }

  lineUp () {
    Object.assign(this.$node.style, {
      top : `${50}%`,
      transition : `top 1s, left 1s, border 0.5s`,
    });
  }
}

// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = DancerClass;
}