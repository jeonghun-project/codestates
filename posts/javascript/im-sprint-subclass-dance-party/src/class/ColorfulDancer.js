
  class ColorfulDancerClass extends DancerClass {
	// your code here
	constructor(top, left, time, speedx, speedy, radius){
		super(top, left, time, speedx, speedy, radius);
	}
	step(){
		super.step();
		let color = ''
		let colorarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
		for(let i = 0; i < 6; i++){
		color = color + colorarr[Math.floor(Math.random() * 16)]
		}
		let style = this.$node.style;
		style.borderColor = `#${color}`
	}
  }