import axios from 'axios'
export default {
  state: {
    itemChat: '',
    chatsMsg: []
  },
  mutations: {
    changeDataItem(state, payload) {
      state.itemChat = payload
    },
    saveMessages(state, payload) {
      state.chatsMsg = payload
    },
    setChat(state, payload) {
      state.chatsMsg.push(payload)
      console.log(state.chatsMsg)
    }
  },
  actions: {
    addRoomListForFriendVuex(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}addlistchatforfriend`, payload)
          .then(result => {
            context.dispatch('getRoomListVuex')
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    addChatVuex(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}chat/send`, payload)
          .then(result => {
            // context.dispatch('getRoomChatsVuex')
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getChatsVuex(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}chat/${payload}`)
          .then(result => {
            context.commit('saveMessages', result.data.data)
            resolve(result)
          })
          .catch(error => {
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
