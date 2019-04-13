// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (!event.profileId) {
    return await db.collection('Profile').add({
      data: {
        ...event
      }
    })
  } else {
    return await db.collection('Profile').doc(event.profileId).update({
      data: {
        ...event
      }
    })
  }
}