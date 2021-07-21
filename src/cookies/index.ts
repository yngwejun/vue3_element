export function setCookies (cname:string, cvalue:string, secound:number):void {
  const d = new Date()
  d.setTime(d.getTime() + (secound * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires
}
export function getCookies (cname:string):string|undefined {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
    return ''
  }
}
