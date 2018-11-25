<template>
  <div>

    <app-header></app-header>
    <router-view></router-view>

  </div>
</template>

<script>

  import AppHeader from './views/Header.vue'

  export default {
    components: { AppHeader },
    name: 'app',
    data () {
      return {

      }
    }
  }
</script>

<style>
  body {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    text-rendering: optimizeLegibility;
  }
  section.block {
    margin: 20px auto 50px;
  }
  section.block h3, section.block h2, section.block h1 {
    margin: 25px auto;
    text-align: center;
  }
</style>