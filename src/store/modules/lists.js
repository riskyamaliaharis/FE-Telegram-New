import axios from 'axios'
export default {
  state: {
    form: {
      user_a: '',
      user_b: ''
    },
    rooms: [],
    myId: '',
    search: ''
  },
  mutations: {
    setRequestBodyAddRoomList(state, payload) {
      state.form.user_a = payload.id_user_a
      state.form.user_b = payload.id_user_b
    },
    setDataRooms(state, payload) {
      state.rooms = payload
    },
    setMyId(state, payload) {
      state.myId = payload
    },
    setMySearch(state, payload) {
      state.search = payload
    }
  },
  actions: {
    addRoomListVuex(context) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL2}/addlistchat`, context.state.form)
          .then(result => {
            context.dispatch('getRoomListVuex')
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getRoomListVuex(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_URL2}/getlistchat/${context.state.myId}?search=${context.state.search}`
          )
          .then(result => {
            context.commit('setDataRooms', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },

  getters: {
    setRoomListGetters(state) {
      return state.rooms
    }
  }
}
