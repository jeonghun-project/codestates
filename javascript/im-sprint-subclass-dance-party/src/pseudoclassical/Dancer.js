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


function improveBook(books, speeds) {
  // TODO: 여기에 코드를 작성합니다.
 // remainder = 100 - books[i] 
//  speeds * [i] >= remainder
// remainder = 100 - books[i]
//  speeds * [i] >= remainder
let arr = [];
for( let i = 0; i<books.length; i++ ){
  let remainder = 100 - books[i]
  // 100 - 55 = 45
  let j = 1
  while( speeds[i] * j <= remainder ){
      j++; // j가 9가 될 때 멈춘다.
  }
  arr.push(j);
}
/////////////// 날짜에 맞는 일수 계산 [ 7,3,9 ] = > [ 2, 1 ]
// [5, 10, 1, 1, 20, 1] => [ 1, 3, 2 ]
 // [ 7,3,9 ] = > [ 2, 1 ]
 let final = []
 const value = arr.length;
let count = 1;
 let first = arr.shift();
 // first = 7   arr = [ 3, 9]
 while( arr.length !== 0 ){
//////////////////////////////////////
   if( first >= arr[0] ){
     count++;
     first = arr.shift();
////////////////////////////////////////     
     // shift()는 length값을 변하게 함
   }
   else{
     final.push(count);
     first = arr.shift();
     count = 1;
   }
   if( arr.length === 0 ){
     final.push(count);
   }
 }
  return final;
}