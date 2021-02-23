import axios from 'axios'
export default {
  state: {
    myContacts: [],
    emailInvitation: ''
  },
  mutations: {
    setMyFriendsList(context, payload) {
      context.myContacts = payload
    },
    sendEmailInvitation(context, payload) {
      context.emailInvitation = payload
    }
  },
  actions: {
    getContactsVuex(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}getfriend/${payload}`)
          .then(result => {
            context.commit('setMyFriendsList', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addFriendVuex(context, payload) {
      return new Promise((resolve, reject) => {
        const data = {
          user_id: payload,
          user_email: context.state.emailInvitation
        }
        axios
          .post(`${process.env.VUE_APP_URL}addfriend`, data)
          .then(result => {
            context.dispatch('getContactsVuex')
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    setMyContactsGetters(state) {
      return state.myContacts
    }
  }
}
