import moment from 'moment'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
export function randomString (length = 16) {
  let result = ''
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function unixToTime (unix) {
  return moment(unix).format('YYYY-MM-DD')
}

export default {
  formatNumber,
  formatTime,
  randomString
}
