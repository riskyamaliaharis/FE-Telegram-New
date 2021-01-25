import axios from 'axios'
export default {
  state: {
    itemChat: '',
    formFriend: {
      user_a: '',
      user_b: '',
      room_random_number: ''
    }
  },
  mutations: {
    changeDataItem(state, payload) {
      state.itemChat = payload
    },
    updateFormFriend(state, payload) {
      state.formFriend.user_a = payload.id_a
      state.formFriend.user_b = payload.id_b
      state.formFriend.room_random_number = payload.random_number
    }
  },
  actions: {
    addRoomListForFriendVuex(context) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `http://localhost:3000/addlistchatforfriend`,
            context.state.formFriend
          )
          .then(result => {
            alert(result.data.msg)
            context.dispatch('getRoomListVuex')
            resolve(result)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  },
  getters: {
    setItemChatGetters(state) {
      return state.itemChat
    }
  }
}
