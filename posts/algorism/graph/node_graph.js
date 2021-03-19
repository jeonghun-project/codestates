// 한 마을에 있는 학생들을 표현해 보았다.
const citizen = {
	0 : '민수',
	1 : '철수',
	2 : '영희',
	3 : '병수',
	4 : '지희'
};

// 서로 양방향 연결을 배열로 나타 낼수 있다.
const link = [
	[1, 2],
	[0, 2, 3],
	[0, 1, 4],
	[1],
	[2],
]

// 서로의 가중치를 주었다고 가정해보자
const country = [
	['철수', 2], ['영희', 2]
	['민수', 2], ['영희', 4], ['병수', 5]
	['민수', 2], ['철수', 4], ['지희', 1]
	['철수', 5]
	['영희', 1]
];

// 클래스를 통해서 단순화 하기
class citizen {
	constructor (name, friend, house) {
		this.name = name;
		this.friend = friend;
		this.house = house;
	};

	getdistance (arr) {
		let [x, y] = this.house;
		return arr.map(ele => {
			let temp = {};
			let [x1, y1] = arr.house;
			temp.ele = Math.abs(x - x1) + Math.abs(y - y1)
			return temp;
		});
	};
}

const citizen1 = {
	name : '민수',
	friends : ['철수', '영희'],
	house : [2, 3]
}

citizen1.getdistance();

class Tree {
	constructor (node) {
		this.node = node;
	}

	addNode (node) {
		let _node = new Tree(node)
		this.addculNode(this, _node);
	};

	addculNode (data, cur) {
		if(cur.node < data.node) {
			data.left = data.left || cur;
			data.left && this.addculNode(data.left, cur);
		} else if(cur.node > data.node) {
			data.right = data.right || cur;
			data.right && this.addculNode(data.right, cur);
		}
	};

	contain ( ele, data = this) {
		data.level = data.level ||  0;
		debugger;
		if(data.node === ele) return data.level;

		if(ele > data.node) {
			if(data.right) {
				data.right.level = data.level + 1;
				data.contain(ele, data.right);
			} else {
				return false;
			}
		} else {
			if(data.left) {
				data.left.level = data.level + 1;
				data.contain(ele, data.left);
			} else {
				return false;
			}
		}
	}
};



