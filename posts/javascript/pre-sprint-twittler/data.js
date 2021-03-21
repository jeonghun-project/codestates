var DATA = [
  { user: 'ingikim', message: 'Welcome to Code States #codestates', created_at: '2019-01-03 12:30:20' },
  { user: 'satya', message: 'this is test message #pair #programming', created_at: '2019-01-04 18:30:20' },
  { user: 'sundar', message: 'code now! #work #hard', created_at: '2019-01-05 07:30:20' },
  { user: 'steve', message: 'Stay hungry, and stay foolish', created_at: '2015-01-03 12:30:20' },
  { user: 'tim', message: 'education for real world', created_at: '2019-01-04 18:30:20' }
];


/// 로컬 스토리지
const setStorage = (arr) => {
  localStorage.setItem('data', JSON.stringify(arr));
}

const getStorage = () => {
  return JSON.parse(localStorage.getItem('data'));
}

function updateStorage(data) {
  let tempdata = getStorage();
  tempdata.push(data);
  setStorage(tempdata);
}

let dataObj = localStorage.getItem('data') 
  ? JSON.parse(localStorage.getItem('data'))
  : setStorage(DATA);


Number.prototype.padLeft = function() {
  if(this < 10) {
    return '0' + String(this);
  }
  else {
    return String(this);
  }
}

Date.prototype.format = function() {
  var yyyy = this.getFullYear();
  var month = (this.getMonth() + 1).padLeft();
  var dd = this.getDate().padLeft();
  var HH = this.getHours().padLeft();
  var mm = this.getMinutes().padLeft();
  var ss = this.getSeconds().padLeft();

  var format = [yyyy, month, dd].join('-') + ' ' + [HH, mm, ss].join(':');
  return format;
}

let currentTime = (now) => {
  `${now.getFullYear()}-${( now.getMonth() + 1).padLeft()}-${now.getDate().padLeft}`
  + ` ${now.getHours()}:${now.getMinutes()}:${now.getSeconds}`
}






