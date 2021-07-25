// 引入Mock
import Mock from 'mockjs'

// mock一个数组
const _users = Mock.mock({
  'users|400': [
    {
      id: '@id()',
      username: '@cname',
      email: '@email',
      address: '@county(true)',
      'age|18-40': 18,
      'sex|1': ['男', '女'],
      avatar: Mock.Random.image('50x50'),
      'msg_state|1': [false, true]
    }
  ]
}).users
// console.log('_users', _users)
// get请求获取用户列表数据
Mock.mock(/\/users/, 'get', req => {
  // console.log('req', req.url)
  const { url } = req
  const pagenum = /(?<=pagenum=)\d+/.exec(url)[0]
  const pagesize = /(?<=pagesize=)\d+/.exec(url)[0]
  const arr = url.split('&')
  let data = []
  const totalpages = _users.length
  // console.log('pagenum', pagenum)
  // console.log('pagenum', pagesize)
  // console.log('query', arr[0])
  if (arr[0] === '/users?query=') {
    const start = (pagenum - 1) * pagesize
    const end = pagenum * pagesize
    data = _users.slice(start, end)
    // console.log('data', data)
  }
  return {
    code: 200,
    totalpages,
    pagenum,
    users: data
  }
})
