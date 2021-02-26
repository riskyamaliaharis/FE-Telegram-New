import axios from 'axios'
export default {
  state: {
    myContacts: [],
    confirms: []
  },
  mutations: {
    setMyFriendsList(context, payload) {
      context.myContacts = payload
    },
    setNeedConfirm(context, payload) {
      context.confirms = payload
    }
  },
  actions: {
    getContactsVuex(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL2}/getfriend/${payload}`)
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
        axios
          .post(`${process.env.VUE_APP_URL2}/addfriend`, payload)
          .then(result => {
            context.dispatch('getContactsVuex')
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    needConfirmVuex(context, payload) {
      return new Promise((resolve, reject) => {
        console.log('ya' + payload)
        axios
          .get(
            `${process.env.VUE_APP_URL2}/getnewfriend/confirm/friend/${payload}`
          )
          .then(result => {
            console.log(result)
            // context.commit('setNeedConfirm', result.data.data)
            resolve(result)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    }
  },
  getters: {
    setMyContactsGetters(state) {
      return state.myContacts
    },
    setConfirms(state) {
      return state.confirms
    }
  }
}
