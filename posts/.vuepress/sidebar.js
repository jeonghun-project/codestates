var fs = require('fs')
// title: 'TIL',
// collapsable: true,
// children: getArticles('TIL')

const sidebar = {
  treeObj : {
    title : '',
    collapsable: true,
    children: [],
  },
  makeSubTree : (dir) => {
    let tempArr = fs.readdirSync(`./posts/${dir}`)
    let regex = /(.md)$/
    tempArr = tempArr.filter(el => {
      return regex.test(el)
    })
    return tempArr.map(el => `../${dir}/` +el.replace(regex, ''))
  },
  makeTree : () => {
    let tempArr = fs.readdirSync('./posts')
    let makeTree = tempArr.filter(el => {
      let regex = [ /^\./g , /(\.md)$/]
      return !regex[0].test(el) && !regex[1].test(el); 
    })
    return makeTree.map(el => {
      return sidebar.treeObj = {
        ...sidebar.treeObj,
        title : el,
        children : sidebar.makeSubTree(el)
      }
    })
  }
}

console.log(sidebar.makeTree())
module.exports = sidebar;
