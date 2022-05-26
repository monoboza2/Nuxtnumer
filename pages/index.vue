<template>
  <div id="app">
    <div>
      <h1 class="name">Nuxt_Numer</h1>
    </div>
    <b-button
      @click="submit"
      variant="outline-success"
      to="/Root/Bisection"
      lg="100"
      size="lg"
      >Success</b-button
    >
  </div>
</template>

<script>
// import Scatter from '../components/chart.vue'
export default {
  layout: 'core',
  data() {
    return {
      token: '',
      email: 's6204062616057@email.kmutnb.ac.th',
      password: '123456789',
    }
  },
  // async fetch() {
  //   this.articles = await fetch('http://localhost:3004/login', {
  //     headers: {
  //       Authorization: `Bearer ${token.accessToken}`,
  //     },
  //   }).then((res) => res.json())

  //   this.check = Object.values(this.item).toString()
  // },
  //   async fetch() {
  //   await this.$http.$get('http://localhost:3004/login',posts,{

  //      "Authorization": `Bearer ${token.accessToken}`
  //   })
  // },
  // async created(){

  //   console.log(user)
  // },

  methods: {
    async submit() {
      try {
        const user = await this.$http.$post('http://localhost:3004/login', {
          email: this.email,
          password: this.password,
        })
        console.log(user.accessToken)
        { $bp: user.accessToken }
      } catch (e) {
        return 0
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  color: rgb(0, 220, 130);
  font-size: 300px;
  font-family: 'Koulen', 'cursive';
  text-align: center;
}
</style>
