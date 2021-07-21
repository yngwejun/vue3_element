import { setCookies } from '@/cookies'
import axios from 'axios'

export function login (
  email:string,
  password:string,
  goto:() => void,
  changeMode: (number) => void,
  getTip: (string) => void
):void {
  console.log(email, password)
  axios({
    url: '/users',
    method: 'post',
    data: {
      user: {
        email,
        password
      }
    },
    responseType: 'json'
  }).then(res => {
    const { token, code, user } = res.data
    if (code === 200) {
      const { username, email } = user
      setCookies('token', token, 60 * 10)
      setCookies('user', username, 60 * 10)
      setCookies('email', email, 60 * 10)
      changeMode(1)
      const timer = setTimeout(() => {
        goto()
        clearTimeout(timer)
      }, 1000)
    } else if (res.data.code === 401) {
      changeMode(2)
      // alert(res.data.message)
      // console.log('message', typeof res.data.message)
      getTip(res.data.message)
      // goto()
    }
    console.log(res.data)
  }, err => {
    console.log(err)
  })
}
