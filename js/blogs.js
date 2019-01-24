const blogs = [
  {
    uid: '003',
    title: '2019年01月24日',
    paragraphs: [
      {
        type: 'text',
        content: '2018年12月14日是UnityLabs的第二届Hackthon，当日在短时间内利用ethers.js + ReactJS做了一个简单的前端做聊天的GUI，后端完全依赖以太坊合约和INFURA.io，最后我将前端页面放在netlify.com上面，这样我就完全基于云服务搭建了我的第一个真正意义上的去中心化应用--UnityChat（起这名字是因为应用是公司里参赛的）。',
      },
      {
        type: 'text',
        content: '10天之后在圣诞节期间又再花了一些精力升级，对事件回调等做了一些改进，UI上增加一些动画过渡。期望以后有精力的时候可以将前端用dva.js重写一次，那么逻辑就更清晰了。',
      },
      {
        type: 'link',
        newTab: true,
        content: '打开新页面',
        href: 'https://kind-jennings-1970c2.netlify.com/#/'
      },
      {
        type: 'image',
        slim: true,
        content: './images/img20190124/index.jpg',
      },
      {
        type: 'image',
        slim: true,
        content: './images/img20190124/settings.jpg',
      },
      {
        type: 'image',
        slim: true,
        content: './images/img20190124/chat.jpg',
      },
    ],
  },
  {
    uid: '002',
    title: '2018年12月10日',
    paragraphs: [
      {
        type: 'text',
        content: '收集了一个自己的3D练习作品，用于演示多边形，可以再控制面板修改背景颜色、多边形的颜色、多边形的边数和多边形外接圆的半径。',
      },
      {
        type: 'link',
        content: '页面跳转',
        href: './polygon_playground.html'
      },
      {
        type: 'image',
        content: './images/img20181210/img1.jpg',
      },
    ],
  },
  {
    uid: '001',
    title: '2018年12月9日',
    paragraphs: [
      {
        type: 'text',
        content: 'Tom的作品园地，取名“以将图南”，比之鲲鹏御风图南，是因为凭借风的原因，即要达成目标必先要有基础有准备，以后会逐渐更新，收集自己的一些练习精华。',
      },
      {
        type: 'text',
        content: '区块链的出现使得许多前端应用的兴起，我相信未来1～2年内以JavaScript语言为主的开发也会相应更加流行，毕竟现在只要出一个新的区块链平台就会出相应的JavaScript库。',
      },
      {
        type: 'text',
        content: '虽然今年币圈遭受重大挫折，但是今后必将出现更多专注于应用的区块链技术出现。',
      },
      {
        type: 'image',
        content: './images/img20181209/img1.jpg',
      },
    ],
  },
]
