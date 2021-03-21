
class BlinkyDancerClass extends DancerClass {
  constructor (top, left, time, speedx, speedy, radius) {
    super(top, left, time, speedx, speedy, radius)
  }

  step () {
    super.step()
    let style = this.$node.style;
    style.display = style.display === 'none' ? 'inline-block' : 'none';
  }

}