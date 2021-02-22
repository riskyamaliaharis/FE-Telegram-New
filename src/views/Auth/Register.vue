<template>
  <div class="body" align-v="center">
    <b-container>
      <b-row>
        <b-col cols="12">
          <RegisterPage />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RegisterPage from '../../components/auth/register'
export default {
  name: 'Register',
  components: {
    RegisterPage
  }
}
</script>

<style scoped>
div.body {
  background-color: rgb(227, 225, 230);
  min-height: 700px;
}
</style>
