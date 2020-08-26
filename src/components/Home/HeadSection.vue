<template>
  <section class="head-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-md">
          <blockquote class="blockquote">
            <p class="mb-0">
              Приветствую Вас на страницах моего портфолио.
              <br />Я Web Developer...
              <strong>Full-Stack Developer</strong>
              <br />На данный момент занимаюсь <strong>Freelance</strong> и
              личными проектами. Нахожусь
              <strong>в поиске интересных проектов</strong>, которые в
              потенциале смогут сделать мир чуточку лучше!
            </p>

            <footer class="blockquote-footer text-right">
              Create something awesome
            </footer>
          </blockquote>

          <router-link :to="{ name: 'contacts' }" class="btn btn-warning"
            >Contact me</router-link
          >
        </div>
        <div class="col-lg-5 col-md">
          <app-window></app-window>
        </div>
      </div>
      <div class="go-down" v-scroll-to="'#skills'">
        <icon name="arrow-down" />
      </div>
    </div>
  </section>
</template>

<script>
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/arrow-down";

import appWindow from "@/components/Window/Index";

export default {
  components: { appWindow, Icon },
};
</script>

<style>
/*.highlight-word {
    display: inline-block;
    position: relative;
    z-index: 0;
    float: right;
    font-size: 1.3em;
    color: #3c3c3c;
  }

  .highlight-word:before {
    content: '';
    background: url(https://cdn2.hubspot.net/hubfs/1951809/text-highlight.png) no-repeat center center;
    background-size: 100% auto;
    width: 108%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: -1;
    transform: translate(-3%,0);
  }*/

/**/
.head-section {
  position: relative;
  overflow: hidden;
  min-height: 650px;
  padding-bottom: 80px;
  background-color: #f8faff;
}
.head-section blockquote {
  margin: 35px auto;
}
.head-section .head-img {
  max-height: 350px;
  margin: 25px auto;
  max-width: 100%;
}
.head-section .btn-contact-me {
  border: 2px solid #333;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.13) 0px 4px 6px 0px;
}
.head-section .btn-contact-me:hover {
  background-color: lightblue;
}

.head-section:before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 50px;
  background: white;
  z-index: 0;
  bottom: -50px;
  z-index: 1;
  box-shadow: rgba(112, 128, 175, 0.05) 0 -16px 24px;
}

.go-down {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 3px solid #6a889c;
  padding: 0 20px 3px;
  border-radius: 30px;
  cursor: pointer;
}
.go-down svg {
  color: #6a889c;
}
.go-down:hover {
  border-color: #6eacd6;
}
.go-down:hover svg {
  color: #6eacd6;
}
</style>
