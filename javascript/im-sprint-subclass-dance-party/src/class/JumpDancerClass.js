/* global DancerClass */
class JumpDancerClass extends BlinkyDancerClass {
  // your code here
  constructor (top, left, time, speedx, speedy, radius) {
    super(top, left, time, speedx, speedy, radius)
  }

  step () {
    super.step()
    let style = this.$node.style;
    style.top = document.body.clientWidth * Math.random() + 'px';
    style.left = document.body.clientHeight * Math.random() + 'px';
  }

}