import axios from 'axios'
export default {
  state: {
    itemChat: '',
    formFriend: {
      user_a: '',
      user_b: '',
      room_random_number: ''
    },
    formMessages: {
      room_random_number: '',
      room_message: '',
      sender_id: '',
      receiver_id: ''
    },
    chatsMsg: []
  },
  mutations: {
    changeDataItem(state, payload) {
      state.itemChat = payload
    },
    updateFormFriend(state, payload) {
      state.formFriend.user_a = payload.id_a
      state.formFriend.user_b = payload.id_b
      state.formFriend.room_random_number = payload.random_number
    },
    updateFormMessages(state, payload) {
      state.formMessages.room_random_number = payload.random_number
      state.formMessages.room_message = payload.message
      state.formMessages.sender_id = payload.sender
      state.formMessages.receiver_id = payload.receiver
    },
    saveMessages(state, payload) {
      state.chatsMsg = payload
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
    },
    addChatVuex(context) {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/chat/send`, context.state.formMessages)
          .then(result => {
            alert(result.data.msg)
            // context.dispatch('getRoomChatsVuex')
            resolve(result)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    getChatsVuex(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/chat/${payload}`)
          .then(result => {
            context.commit('saveMessages', result.data.data)
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
    },
    setChatsGetters(state) {
      return state.chatsMsg
    }
  }
}
