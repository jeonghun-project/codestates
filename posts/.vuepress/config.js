let path = require('path')
let {getArticles} = require(path.resolve('posts/.vuepress/sidebar'))

module.exports = {
  title: 'Hoon\'s devlog',
  description: 'Hoon\'s devlog',
  base: '/Learning-things/',
  dest: 'post',
  themeConfig: {
    logo: 'logo_hoon\'s_full.png',
    smoothScroll: true,
    nav: [{
      text: 'GitHub',
      link: 'https://github.com/jeonghun-project/Learning-things'
    }],
    smoothScroll: true,
    sidebar: [
      {
        title: 'TIL',
        collapsable: true,
        children: getArticles('TIL')
      },
      {
        title: 'Javascript',
        collapsable: true,
        children: getArticles('javascript')
      },
      {
        title: 'algorism',
        collapsable: true,
        children: getArticles('algorism')
      },
      {
        title: 'nodeJS',
        collapsable: true,
        children: getArticles('nodeJS')
      },
      {
        title: 'ShellScript',
        collapsable: true,
        children: getArticles('ShellScript')
      },
      {
        title: 'ErrorCase',
        collapsable: true,
        children: getArticles('ErrorCase')
      }
  ]
  }
}