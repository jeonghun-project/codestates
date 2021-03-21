function towerOfHanoi(num) {
	let temp = num;
	let arr = [[],[],[]];
	while(num > 0) arr[0].push(num--);
	
	function hanoi(num, from , to) {
		if(num === 0) return 0;
		let spare = hanoisparePeg(from, to);
		hanoi(num - 1, from, spare);
		hanoimove(arr, from, to);
		console.log(arr);
		hanoi(num - 1, spare, to);
	};

	hanoi(temp, 0, 2);
};


function hanoisparePeg(i, j) {
	return 1 - (i - 1) - (j -1);
};

function hanoimove(arr, i, j) {
	arr[j].push(arr[i][arr[i].length - 1]);
	arr[i].pop();
};