<template>
  <section class="block" id="skills">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">

          <div class="orbit">
            <div class="orbit-circle-code orbit-circle-wrap">
              <p class="code orbit-circle-wrap"><icon name="code" scale="6"/></p>
            </div>
            <div class="orbit-circle-inner orbit-circle-wrap"></div>
            <div class="orbit-circle-middle orbit-circle-wrap"></div>
            <div class="orbit-circle-outer orbit-circle-wrap">
              <div class="skill-wrap" v-for="skill in skills" data-aos="fadeIn" data-aos-offset="-100" :style="getStyle(skill)">
                <p class="skill-text">{{ skill.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <h2 class="about-title">About</h2>
          <p class="about-description">
            На бэке использую связку PHP и MySQL, в зависимости от проекта - пишу с нуля или на самописной CMS.
            На фронте, конечно же - JavaScript. Для чего-то простенького использую чистый JS или jQuery. Для чего-то сложного - VueJS.
            Для верстки, в зависимости от проекта, работал с Twitter Bootstrap, Element, Vuetify, MaterializeCSS. Предпочтения отдаю первому в списке.
            Собираю это всё системами сборки Webpack или Gulp
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon';
  import 'vue-awesome/icons/code';

  export default {
    components: { Icon },
    data() {
      return {
        skills: {
          php: { name: 'PHP', top: 17, left: 12, color: '#00E3F0' },
          js: { name: 'JavaScript', top: 36, left: 26, color: '#7cf7a4' },

          html: { name: 'Html', top: 52, left: 11, color: '#b8fb85' },
          css: { name: 'CSS', top: 72, left: 18, color: '#b8fb85' },
          webpack: { name: 'Webpack', top: 27, left: 82, color: '#b8fb85' },
          vue: { name: 'Vue.js', top: 22, left: 50, color: '#7cf7a4' },
          jquery: { name: 'jQuery', top: 82, left: 72, color: '#00E3F0' },
          mysql: { name: 'MySql', top: 73, left: 95, color: '#00E3F0' },
          bootstrap: { name: 'Bootstrap', top: 94, left: 26, color: '#b8fb85' },


          git: { name: 'Git & GitHub', top: 100, left: 54, color: '#b8fb85' },
          json: { name: 'JSON', top: 59, left: 88, color: '#b8fb85' },
          element: { name: 'Element', top: 77, left: 44, color: '#7cf7a4' },
          vuetify: { name: 'Vuetify', top: 44, left: 77, color: '#b8fb85' },
          gulp: { name: 'Gulp', top: 66, left: 2, color: '#00E3F0' },

          // materializeCSS: { name: 'MaterializeCSS', top: 75, left: 20, color: '#b8fb85' },
        }
      }
    },
    methods: {
      getStyle(skill) {
        return {
          top: skill.top + '%',
          left: skill.left + '%',
          backgroundColor: skill.color
        }
      }
    }
  }
</script>

<style>
.orbit {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}
.orbit-circle-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.orbit-circle-code {
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background: #EDF9FF;
  color: #fff;
  font-size: 3em;
  font-weight: 700;
}
.orbit-circle-inner {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  border: 3px solid #EDF9FF;
}
.orbit-circle-middle {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  border: 3px solid #EDF9FF;
}
.orbit-circle-outer {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  border: 3px solid #EDF9FF;
}

/* skills */
.skill-text {
  color: #96b4c7;
  font-weight: 300;
  margin-top: -1.5em;
  font-size: 1.5em;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  position: absolute;
  white-space: nowrap;
}
.skill-wrap {
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 5%;
  height: 5%;
  background-color: #00E3F0; /* default color */
}



  .about-title {
      color: #EDF9FF;
      position: relative;
      display: inline-block;
      margin-bottom: 3rem;
  }

  .about-title {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 5.8rem;
  }

  .about-title::before {
      content: 'skills & abilities';
      display: block;
      color: #7FF6A6;
      text-transform: capitalize;
      font-family: 'Raleway', sans-serif;
      font-style: italic;
      font-weight: 400;
      font-size: .39em;
      position: absolute;
      right: -14%;
      bottom: 5%;
  }

  .about-description {
      color: #96b4c7;
      font-weight: 300;
      font-size: 20px;
  }

  @media (min-width: 1100px) {
    .about-title {
      font-size: 7.5rem;
    }
  }
  /* < 992px */
  @media (max-width: 992px) {
    .about-title {
      font-size: 4.5rem;
    }
    .skill-text {
      font-size: 1em;
    }
    h2.head {
      font-size: 1.7rem;
    }
  }

</style>