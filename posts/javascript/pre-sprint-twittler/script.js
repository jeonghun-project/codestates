const twittBtn = document.querySelector(".buttonframe");
const getUsername = document.querySelector(".inputusername");
const gettwittcnt = document.querySelector(".twittextinput");
const usernamebtn = document.querySelectorAll(".editprofile");
const ulctnelement = document.querySelector(".maineelement");


function handleTwittBtn() {
	let newObj = {};
	let now = new Date();

	newObj['user'] = getUsername.value;
	newObj['message'] = gettwittcnt.value;
	newObj['created_at'] = now.format();
	
	updateStorage(newObj);
	loadtwittlist(newObj);
}

function handleUsernameBtn(event) {
	let filterName= event.target.textContent;

	let tempdata = getStorage();
	let newDATA = tempdata.filter( function (obj) {
		return filterName === obj['user'];
	});

	Allremovelist();

	for(let obj of newDATA) {
		loadtwittlist(obj);
	}
}

function Allremovelist() {
	while(ulctnelement.firstChild) { 
		ulctnelement.removeChild(ulctnelement.firstChild);
	}
}

function loadtwittlist(data) {
	function newTag(str) {
		return document.createElement(str)
	}
	const fragCreatAt = document.createDocumentFragment();
	const ulctnelement = document.querySelector(".maineelement");
	let twlistfrag = fragCreatAt;

	let newDataObj = data;
	let newlist = newTag('li')
	newlist.classList.add('articleframe')
	let classarr = ['imgframe', "profileimg", "contentframe", "article", "editprofile", "content", "articlebuttonframe", "dateframe"];
	const tagObj = {};
	for(let ele of classarr) {
		tagObj[ele] = ele;
	}
	classarr.forEach(function(ele) {
		let temp = newTag('div');
		temp.classList.add(ele);
		tagObj[ele] = temp;
	});

	tagObj["editprofile"].onclick = handleUsernameBtn;
	tagObj["imgframe"].appendChild(tagObj["profileimg"]);
	newlist.appendChild(tagObj["imgframe"]);
	tagObj["editprofile"].textContent = newDataObj.user;
	tagObj["content"].textContent = newDataObj.message;
	tagObj["article"].appendChild(tagObj["editprofile"]);
	tagObj["article"].appendChild(tagObj["content"]);
	tagObj["dateframe"].textContent = newDataObj.created_at;
	tagObj["articlebuttonframe"].appendChild(tagObj["dateframe"]);
	tagObj["contentframe"].appendChild(tagObj["article"]);
	tagObj["contentframe"].appendChild(tagObj["articlebuttonframe"]);
	newlist.appendChild(tagObj["contentframe"]);
	twlistfrag.appendChild(newlist);
	ulctnelement.prepend(twlistfrag);

}

let rawdata = getStorage()
for (let obj of rawdata) {
	loadtwittlist(obj);
}

twittBtn.onclick = handleTwittBtn;
for(let name of usernamebtn) {
	name.onclick = handleUsernameBtn;
}
// DATA는 이미 작성된 트윗을 표시합니다.
console.log(DATA);