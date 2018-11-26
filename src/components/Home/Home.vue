<template>
  <div>
    <section class="head">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md">
            <blockquote class="blockquote text-light">
              <p class="mb-0">Приветствую Вас на страницах моего портфолио.<br>
              Я <strong>Web Developer</strong>, на данный момент занимаюсь <strong>Freelance</strong> и личными проектами. Нахожусь <strong>в поиске интересных проектов</strong>, которые в потенциале смогут сделать мир чуточку лучше!</p>
              <footer class="blockquote-footer text-light text-right">Create something awesome</footer>
            </blockquote>

            <router-link :to="{name: 'contacts'}" class="btn-contact-me">
              Contact me
            </router-link>

          </div>
          <div class="col-lg-4 d-none d-lg-block">
            <img src="src/assets/head.png" alt="" class="head-img">
          </div>
        </div>
      </div>
    </section>

    <div class="container">

      <section class="block">
        <h3>Мой стек</h3>

        <div class="row">
          <div class="col-lg-6 col-md">
            На бэке использую связку
            <span class="link-hover" @mouseenter="h('php-mysql')" @mouseleave="h('')">PHP</span> и
            <span class="link-hover" @mouseenter="h('php-mysql')" @mouseleave="h('')">MySQL</span>,
            в зависимости от проекта - пишу с нуля или на самописной CMS. <br>
            На фронте, конечно же -
            <span class="link-hover" @mouseenter="h('js')" @mouseleave="h('')">JavaScript</span>.

            Для чего-то простенького использую чистый
            <span class="link-hover" @mouseenter="h('js')" @mouseleave="h('')">JS</span> или
            <span class="link-hover" @mouseenter="h('jquery')" @mouseleave="h('')">jQuery</span>.
            Для чего-то сложного -
            <span class="link-hover" @mouseenter="h('vue')" @mouseleave="h('')">VueJS</span>.
            <br>
            Для верстки, в зависимости от проекта, работал с
            <span class="link-hover" @mouseenter="h('bootstrap')" @mouseleave="h('')">Twitter Bootstrap</span>,
            <span class="link-hover" @mouseenter="h('css')" @mouseleave="h('')">Element</span>,
            <span class="link-hover" @mouseenter="h('css')" @mouseleave="h('')">Vuetify</span>,
            <span class="link-hover" @mouseenter="h('css')" @mouseleave="h('')">MaterializeCSS</span>.
            Предпочтения отдаю первому в списке. <br>
            Собираю это всё системами сборки
            <span class="link-hover" @mouseenter="h('webpack')" @mouseleave="h('')">Webpack</span> или
            <span class="link-hover">Gulp</span>
          </div>
          <div class="col-lg-6 col-md">
            <div class="skill-logo">
              <b-img v-for="item in ['html', 'css', 'js', 'webpack', 'vue']"
                     :class="activeClass(item)"
                     :key="item"
                     :alt="item" class="m-1" :src="`/src/assets/skills/${item}.png`"/>
            </div>
            <div class="skill-logo">
              <b-img v-for="item in ['jquery', 'php-mysql', 'bootstrap']"
                     :class="activeClass(item)"
                     :key="item"
                     :alt="item" class="m-1" :src="`/src/assets/skills/${item}.png`"/>
            </div>
          </div>
        </div>

      </section>

      <section class="block">
        <h3>Последние проекты</h3>

        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-12" v-for="item in projects">

            <div class="project-item">
              <div class="mac-toolbar">
                <span class="mac-toolbar-btn btn-close"></span>
                <span class="mac-toolbar-btn btn-hide"></span>
                <span class="mac-toolbar-btn btn-open"></span>
              </div>
              <router-link :to="{name: 'project', params: {name: item.route}}">
                <div class="project-preview" :class="item.route"></div>
              </router-link>

              <div class="project-info">
                <div class="project-desc text-center">
                  {{ item.title }}
                </div>

                <router-link :to="{name: 'project', params: {name: item.route}}" tag="div" class="text-center">
                  <a>Подробнее</a>
                </router-link>
              </div>
            </div>

          </div>
        </div>

      </section>

    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import bImg from 'bootstrap-vue/es/components/image/img';
  import bButton from 'bootstrap-vue/es/components/button/button';

  export default {
    components: { bImg, bButton },
    data() {
      return {
        activeSkill: ''
      }
    },
    computed: {
      ...mapGetters({
        projects: 'projects/all'
      })
    },
    methods: {
      h(item) {
        this.activeSkill = item;
      },
      activeClass(item) {
        if(this.activeSkill == '') return;

        return (item == this.activeSkill) ? 'skill-hover' : 'skill-shadow';
      }
    }
  }
</script>

<style>
  /* link */
  .link-hover {
    border-bottom: 3px solid #00D97E;
    -webkit-transition: background .2s,color .2s;
    -o-transition: background .2s,color .2s;
    transition: background .2s,color .2s;
    position: relative;
    background: -webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0)),color-stop(50%,rgba(255,255,255,0)),color-stop(51%,#00E686),to(#00E686));
    background: -o-linear-gradient(top,rgba(255,255,255,0) 0,rgba(255,255,255,0) 50%,#00E686 51%,#00E686 100%);
    background: linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,0) 50%,#00E686 51%,#00E686 100%);
    background-size: 100% 200%;
  }
  .link-hover:hover {
    background-position: 0 100%;
    color: #fff;
    border-color: transparent;
    text-decoration: none;
  }

  /**/
  .head {
    background-image: linear-gradient(134deg, rgb(48, 35, 174) 0%, rgb(200, 109, 215) 100%);
    position: relative;
    overflow: hidden;
    height: 400px
  }
  .head::after {
    content: '';
    opacity: 0.4;
    position: absolute;
    bottom: -20px;
    width: 100%;
    left: 0px;
    height: 50px;
    background: linear-gradient(to top, black, transparent);
  }
  .head blockquote {
    margin: 35px auto;
  }
  .head .head-img {
    max-height: 350px;
    margin: 25px auto;
    max-width: 100%;
  }
  .head .btn-contact-me {
    border: 2px solid #dae0e5;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    padding: 10px 15px;
    text-decoration: none;
    color: #dae0e5;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px 0px, rgba(0, 0, 0, 0.13) 0px 4px 6px 0px;
  }
  .head .btn-contact-me:hover {
    background-color: #15131340;
  }

  .skill-logo {
    text-align: center;
  }
  .skill-logo img {
    height: 75px;
    transition: all 300ms ease 0s;
  }
  .skill-logo img:hover {
    transform: scale(1.2);
  }

  .skill-hover {
    transform: scale(1.1);
  }
  .skill-shadow {
    opacity: 0.3;
  }
  /* Project items */
  .project-item {
    box-shadow: rgba(42, 51, 83, 0.12) 0px 18px 35px 0px, rgba(0, 0, 0, 0.06) 0px 8px 15px;
    margin: 15px auto;
    transition: all 300ms ease 0s;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .project-item:hover {
    transform: translateY(-0.5rem);
  }
  .project-item .mac-toolbar {
    background-color: rgb(246, 246, 246);
    padding: 0.875rem;
  }
  .project-item .mac-toolbar-btn {
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 100%;
    margin: 0.25rem;
  }
  .project-item .mac-toolbar-btn.btn-close {
    background-color: rgb(255, 97, 88);
  }
  .project-item .mac-toolbar-btn.btn-hide {
    background-color: rgb(255, 191, 46);
  }
  .project-item .mac-toolbar-btn.btn-open {
    background-color: rgb(39, 204, 64);
  }
  .project-item .project-preview {
    background-image: url("/src/assets/scanchange-prev.png");
    background-size: cover;
    min-height: 264px;
    background-color: rgb(255, 255, 255);
    background-repeat: no-repeat;
    /*background-position: left top;*/
    background-position: center;
  }
  .project-item .project-preview.scanchange {
    background-image: url("/src/assets/scanchange-prev.png");
  }
  .project-item .project-preview.autotras {
    background-image: url("/src/assets/autotras-prev.png");
  }
  .project-item .project-preview.jpbooks {
    background-image: url("/src/assets/jpbooks-prev.jpg");
  }
  .project-item .project-preview.hamiltonhouse {
    background-image: url("/src/assets/hamiltonhouse-prev.jpg");
  }
  .project-item .project-preview.bot-for-vk {
    background-image: url("/src/assets/botvk-prev.png");
  }


</style>