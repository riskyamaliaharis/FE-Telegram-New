<template>
  <div>
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row>
        <b-col class="card" cols="5" align-self="center">
          <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
            <h4>Register</h4>

            <p style="text-align: left">Let's create your account!</p>
            <div class="form" style="text-align: left; color: grey">
              <label for="inputName">Name</label>
              <br />
              <input
                class="input"
                id="inputName"
                type="text"
                v-model="form.user_name"
                required
              />
            </div>

            <div class="form" style="text-align: left; color: grey">
              <label for="inputEmail">Email</label>
              <br />
              <input
                class="input"
                id="inputEmail"
                type="email"
                v-model="form.user_email"
                required
              />
            </div>

            <div class="form" style="text-align: left; color: grey">
              <label for="inputPass">Password</label>
              <br />
              <input
                class="input"
                id="inputPass"
                type="password"
                v-model="form.user_password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
            </div>
            <p style="text-align: right"><a href="#">Forgot Password?</a></p>
            <br />
            <div>
              <button class="btn1" type="submit">Sign Up</button>
            </div>
            <b-row align-v="center" align-content="center">
              <b-col><div class="line"></div></b-col>
              <b-col><p>Register With</p></b-col>
              <b-col><div class="line"></div></b-col>
            </b-row>
            <div>
              <button class="btn2" type="submit">
                <i class="fa fa-google"></i> Google
              </button>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { alert } from '../../mixins/alert'
export default {
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: ''
      }
    }
  },
  mixins: [alert],
  methods: {
    ...mapActions(['signup']),
    onSubmit() {
      console.log(this.form)
      this.signup(this.form)
        .then(result => {
          this.successAlert(result.data.msg)
          this.$router.push('/')
        })
        .catch(error => {
          this.errorAlert(error.data.msg)
        })
    }
  }
}
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 20px;
  text-align: center;
  margin: auto;
  padding: 20px 40px 40px;
  margin-top: 50px;
}
label {
  font-size: 15px;
}

p {
  font-size: 15px;
}

p a {
  font-size: 12px;
  color: #7e98df;
}

h4 {
  color: #7e98df;
  font-weight: 500;
  margin-bottom: 30px;
}
input.input {
  border: none;
  border-bottom-width: thin;
  border-bottom-style: solid;
  width: 100%;
}
.form {
  margin-top: 30px;
}

.btn1,
.btn2 {
  display: block;

  border-radius: 30px;
  width: 100%;
  border-color: #7e98df;
  padding: 10px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;

  margin-bottom: 10px;
}
.btn1 {
  background-color: #7e98df;
  color: white;
}
.btn2 {
  background-color: white;
  color: #7e98df;
}
div.line {
  border-color: rgb(227, 225, 230);
  border-style: solid;
  border-width: 0.02px;
}
</style>
