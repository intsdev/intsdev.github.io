<template>
  <div>
    <app-header></app-header>
    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      @after-leave="$root.$emit('triggerScroll');"
      mode="out-in"
    >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import AppHeader from "./views/Header.vue";
import AOS from "aos";

export default {
  components: { AppHeader },
  name: "App",
  created() {
    AOS.init({
      useClassNames: true,
      initClassName: false,
      animatedClassName: "animated",
    });
  },
};
</script>

<style>
body,
html {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-rendering: optimizeLegibility;
}
::selection {
  background: #b9fa8a;
  color: #fcffff;
}
section.block {
  padding: 20px 0 50px;
  line-height: 32px;
  letter-spacing: 0.1px;
  font-size: 18px;
}
section.block .head {
  margin: 5rem auto 3rem;
  text-align: center;
}
[data-aos] {
  visibility: hidden;
}
[data-aos].animated {
  visibility: visible;
}
</style>
