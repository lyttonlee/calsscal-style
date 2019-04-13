// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // let {OPENID, APPID, UNIONID} = wxContext
  let users = await db.collection('User').where({
    openid: wxContext.OPENID
  }).get()
  if (users.data.length === 0) {
    return {
      openid: wxContext.OPENID,
      hasRegined: false
    }
  } else {
    return users.data[0]
  }
}