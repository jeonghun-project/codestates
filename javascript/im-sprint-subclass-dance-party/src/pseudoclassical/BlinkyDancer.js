function BlinkyDancer (top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps)
}

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;
BlinkyDancer.prototype.oldstep = Dancer.prototype.step;

BlinkyDancer.prototype.step = function () {
  BlinkyDancer.prototype.oldstep.call(this);

  let style = this.$node.style;
  style.display = style.display === 'none' ? 'inline-block' : 'none';
}
