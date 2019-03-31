import {
  CHECKUSERLOGINED
} from './mutations-types'
const mutations = {
  [CHECKUSERLOGINED] (state, data) {
    state.userInfo = data
    state.hasLogin = true
    console.log(state)
  }
}

export default mutations
