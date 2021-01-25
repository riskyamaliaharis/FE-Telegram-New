import axios from 'axios'
export default {
  state: {
    form: {
      user_a: '',
      user_b: ''
    },
    rooms: [],
    myId: ''
  },
  mutations: {
    setRequestBodyAddRoomList(context, payload) {
      context.form.user_a = payload.id_user_a
      context.form.user_b = payload.id_user_b
    },
    setDataRooms(context, payload) {
      context.rooms = payload
      console.log('context.rooms')
      console.log(context.rooms)
    },
    setMyId(context, payload) {
      context.myId = payload
    }
  },
  actions: {
    addRoomListVuex(context) {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/addlistchat`, context.state.form)
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
    getRoomListVuex(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/getlistchat/${context.state.myId}`)
          .then(result => {
            context.commit('setDataRooms', result.data.data)
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
    setRoomListGetters(state) {
      return state.rooms
    }
  }
}
