        // 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // let {userInfo} = event
  let userData = Object.assign({}, {
    role: '古风迷',
    reginDate: new Date(),
    openid: wxContext.OPENID
  }, event)
  let res = await db.collection('User').add({
    data: userData
  })
  return await db.collection('User').doc(res._id).get()
}