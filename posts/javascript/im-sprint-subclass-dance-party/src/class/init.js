/* eslint-disable */
const dancers = [];

function handleClickDancerButton () {
  let radius = Math.floor(Math.random() * (10 - 5) + 3);
  let top = Math.random() * (innerWidth - radius * 2) + radius;
  let left = Math.random() * (innerHeight - radius * 2) + radius;
  let speedx = (Math.random() - 0.5) * 4;
  let speedy = (Math.random() - 0.5) * 4;
  let time = Math.random() * 1000;

  const classList = {
    0 : (args) => new BlinkyDancerClass(...args),
    1 : (args) => new ColorfulDancerClass(...args),
    2 : (args) => new JumpDancerClass(...args)
  };

  let dancer = classList[Math.floor(Math.random()*3)]([top, left, time, speedx, speedy, radius]);

  dancers.push(dancer);
  dancer.render(document.body);
}

function handleClockLineUpbtn() {
  for(let ele of dancers) {
    //dancer 정렬
    ele.lineUp();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const elAddDancerButton = document.querySelector('.addDancerButton');
  const lineUpButton = document.querySelector('.lineUp');

  elAddDancerButton.addEventListener('click', handleClickDancerButton);
  lineUpButton.addEventListener('click', handleClockLineUpbtn)

  window.addEventListener('resize', e => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const animate = () => {
    requestAnimationFrame(animate);
    
    for (let ele of dancers) {
      ele.update();
    }
  }
  animate();
});
