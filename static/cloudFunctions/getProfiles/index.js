// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
let db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    let {type} = event
    // 获取用户的所有作品
    if (type === 'my') {
      let profiles = await db.collection('Profile').where({
        openid: wxContext.OPENID
      }).get()
      return profiles
    }
  }catch(err) {
    console.log(err)
  }
  
}