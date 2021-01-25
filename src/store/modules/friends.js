import axios from 'axios'
export default {
  state: {
    myContacts: [],
    emailInvitation: ''
  },
  mutations: {
    setMyFriendsList(context, payload) {
      console.log('masuk3')
      context.myContacts = payload
      console.log(context.myContacts)
    },
    sendEmailInvitation(context, payload) {
      console.log('two')
      context.emailInvitation = payload
    }
  },
  actions: {
    getContactsVuex(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/getfriend/${payload}`)
          .then(result => {
            context.commit('setMyFriendsList', result.data.data)
            resolve(result)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    addFriendVuex(context, payload) {
      return new Promise((resolve, reject) => {
        console.log('four')
        const data = {
          user_id: payload,
          user_email: context.state.emailInvitation
        }
        console.log(data)
        axios
          .post('http://localhost:3000/addfriend', data)
          .then(result => {
            alert(result.data.msg)
            context.dispatch('getContactsVuex')
            resolve(result)
          })
          .catch(error => {
            alert(error.result.data.msg)
            reject(error)
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
