<template>
  <div>

    <app-header></app-header>

    <transition name="fade"
                enter-active-class="fade-in"
                leave-active-class="hidden"
                mode="out-in">

      <router-view></router-view>
    </transition>

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


  /* Animations Styles */
  .hidden {
    display: none;
  }
  .fade-in {
    -webkit-animation: fadein 1s;
    -moz-animation: fadein 1s;
    -ms-animation: fadein 1s;
    -o-animation: fadein 1s;
    animation: fadein 1s;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }


</style>