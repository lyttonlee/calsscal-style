// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()



// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {OPENID, APPID, UNIONID} = wxContext
  // 去User中查找是否有含有当前openid的用户
  let users = await db.collection('User').where({
    openid: OPENID
  }).get()
  if (users.data.length === 0) {
    // 没有此用户就注册一个用户
    // 设定用户信息
    let userData = {
      role: '古风迷',
      reginDate: new Date(),
      openid: OPENID
    }
    // 向User添加一个用户
    let res = await db.collection('User').add({
      data: userData
    })
    // 找出该用户并返回
    let newUser = await db.collection('User').doc(res._id).get()
    // console.log(newUser)
    return newUser.data
  } else {
    // 如果有这个用户，就将用户返回
    // 这里可以断言users.data的长度最多为1
    return users.data[0]
  }
}