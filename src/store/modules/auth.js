import axios from 'axios'
import router from '../../router/index'
export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null,
    form: {
      user_name: '',
      user_email: '',
      user_password: ''
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
      console.log('Proses Mutation setUser')
      console.log(state.user)
      console.log(state.token)
    },
    delUser(state) {
      state.user = {}
      state.token = null
    },
    setNewUser(state, payload) {
      state.form.user_name = payload.user_name
      state.form.user_email = payload.user_email
      state.form.user_password = payload.user_password
    }
  },
  actions: {
    login(context, payload) {
      console.log('payload ' + payload)
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/login`, payload)
          .then(result => {
            console.log(result)
            context.commit('setUser', result.data.data)
            localStorage.setItem('token', result.data.data.token)
            alert(result.data.msg)
            resolve(result)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    signup(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/signup`, payload)
          .then(result => {
            console.log(result)
            context.commit('setNewUser', result.data.data)
            alert(result.data.msg)
            resolve(result)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/')
    },
    interceptorRequest(context) {
      console.log('Interceptor Request Works !')
      axios.interceptors.request.use(
        function(config) {
          config.headers.authorization = `Bearer ${context.state.token}`
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      console.log('Interceptor Response Works !')
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          if (
            error.response.data.status === 403 &&
            (error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature' ||
              error.response.data.msg === 'jwt expired' ||
              error.response.data.msg === 'jwt malformed')
          ) {
            context.dispatch('logout')
            alert(error.response.data.msg)
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    setUser(state) {
      return state.user
    },
    isLogin(state) {
      return state.token !== null
    }
  }
}
