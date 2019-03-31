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
    await db.collection('User').add({
      data: {
        openid: wxContext.OPENID,
        role: '古风迷',
        reginDate: new Date()
      }
    })
  }
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  }
}