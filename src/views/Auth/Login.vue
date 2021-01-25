<template>
  <div class="body" align-v="center">
    <LoginPage />
  </div>
</template>

<script>
import LoginPage from '../../components/auth/login'
export default {
  name: 'Login',
  components: {
    LoginPage
  }
}
</script>

<style scoped>
div.body {
  background-color: rgb(227, 225, 230);
  min-height: 700px;
}
</style>
