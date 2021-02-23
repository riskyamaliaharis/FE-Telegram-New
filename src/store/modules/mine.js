import axios from 'axios'
export default {
  state: {
    profile: '',
    form: {
      user_name: '',
      user_email: '',
      user_photo: '',
      user_location: ''
    }
  },
  mutations: {
    setMyProfile(context, payload) {
      context.profile = payload
    },
    sendMyUpdatedData(context, payload) {
      context.form.user_name = payload.username
      context.form.user_email = payload.email
      context.form.user_photo = payload.photo
      context.form.user_location = payload.location
    }
  },
  actions: {
    getMyProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}showprofile/${payload}`)
          .then(result => {
            context.commit('setMyProfile', result.data.data[0])
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    editMyProfile(context, payload) {
      return new Promise((resolve, reject) => {
        const {
          user_name,
          user_email,
          user_photo,
          user_location
        } = context.state.form
        const data = new FormData()
        data.append('user_name', user_name)
        data.append('user_email', user_email)
        data.append('user_photo', user_photo)
        data.append('user_location', user_location)
        for (var pair of data.entries()) {
          console.log(pair[0] + ', ' + pair[1])
        }
        axios
          .patch(`${process.env.VUE_APP_URL}updateuser/${payload}`, data)
          .then(response => {
            context.dispatch('getMyProfile')

            resolve(response)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateLocation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL}update/location`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deletePhotos(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL}update/photo/${payload}`)
          .then(result => {
            context.dispatch('getMyProfile')
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    setProfileMine(state) {
      return state.profile
    },
    setUserNameMine(state) {
      return state.form.user_name
    },
    setUserEmailMine(state) {
      return state.form.user_email
    },
    setUserPhotoMine(state) {
      return state.form.user_photo
    },
    setUserLocationMine(state) {
      return state.form.user_location
    }
  }
}
