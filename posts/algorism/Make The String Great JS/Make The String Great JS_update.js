const makeGood = function(s) {
    let result = [""]; 
    s = s.split('');
    s.forEach((ele) => {
        if(result[result.length - 1].toLowerCase() === ele.toLowerCase() && result[result.length - 1] !== ele ) result.pop();
        else result.push(ele);
    });
    return result.join('');
};

const makeGood = function(s) {
	s = s.split('');
	let i = 0;
	while (i < s.length - 1) {
		if(lower.includes(s[i])) {
			if(s[i].toUpperCase() === s[i + 1]) {
				s.splice(i, 2);
				i = 0;
				continue;
			}
		} else {
			if(s[i].toLowerCase() === s[i + 1]) {
				s.splice(i, 2);
				i = 0;
				continue;
			}
		}
		i++;
	};
	return s.join('');
};