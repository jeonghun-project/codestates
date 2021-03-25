var fs = require('fs')
// title: 'TIL',
// collapsable: true,
// children: getArticles('TIL')

let mainTitle = '';

let childrenArr = [];

let treeObj = {
  title : mainTitle,
  collapsable: true,
  children: childrenArr
};

const makeSubTree = (dir) => {
  let tempArr = fs.readdirSync(`./posts/${dir}`)
  return tempArr.filter(el => {
    let regex = /(.md)$/
    return regex.test(el);
  })
}

const makeTree = () => {
  let tempArr = fs.readdirSync('./posts')
  let makeTree = tempArr.filter(el => {
    let regex = [ /^\./g , /(\.md)$/]
    return !regex[0].test(el) && !regex[1].test(el); 
  })

  return makeTree.map(el => {
    return treeObj = {
      ...treeObj,
      title : el,
      children : makeSubTree(el)
    }
  })
}


export default makeTree;
