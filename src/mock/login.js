import Mock from 'mockjs'

Mock.mock('/users', 'post', req => {
  const body = JSON.parse(req.body)
  const user = body.user
  const email = user.email
  const password = user.password
  console.log('pwd', user)
  const token = 'ef45ge13te145'
  if (email === 'admin@admin.com' && password === '123456') {
    console.log('登录成功')
    user.username = 'admin'
    delete user.password
    return Mock.mock({
      code: 200,
      message: '登录成功',
      token,
      user
    })
  } else {
    return {
      code: 401,
      message: '用户名和密码不正确'
    }
  }
})
