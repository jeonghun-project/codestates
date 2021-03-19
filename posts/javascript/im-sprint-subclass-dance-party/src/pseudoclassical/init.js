/* eslint-disable */
const dancers = [];

function handleClickDancerButton () {
  let dancer = new BlinkyDancer(
    document.body.clientHeight * Math.random(),
    document.body.clientWidth * Math.random(),
    Math.random() * 1000
  );
  document.body.appendChild(dancer.$node);
}

window.addEventListener('DOMContentLoaded', () => {
  const elAddDancerButton = document.querySelector('.addDancerButton');
  elAddDancerButton.addEventListener('click', handleClickDancerButton);
});
