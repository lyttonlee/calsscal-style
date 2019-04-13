// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {openid} = event
  let users = await db.collection('User').where({
    openid
  }).get()
  return users.data[0]
}