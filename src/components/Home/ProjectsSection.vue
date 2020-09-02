<template>
  <section class="block projects">
    <div class="container">
      <h2 class="head">Некоторые из моих работ</h2>

      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item, ind) in projects" :key="ind">
          <div class="project-item">
            <div class="mac-toolbar">
              <span class="mac-toolbar-btn btn-close"></span>
              <span class="mac-toolbar-btn btn-hide"></span>
              <span class="mac-toolbar-btn btn-open"></span>
            </div>
            <router-link :to="{ name: 'project', params: { name: item.route } }">
              <div class="project-preview" :class="item.route"></div>
            </router-link>

            <div class="project-info">
              <div class="project-desc text-center">{{ item.title }}</div>

              <router-link
                :to="{ name: 'project', params: { name: item.route } }"
                tag="div"
                class="read-more text-center"
              >
                <a>Подробнее</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      projects: "projects/all",
    }),
  },
};
</script>

<style>
section.projects {
  background-color: #f8faff;
  position: relative;
}
section.projects .head {
  color: #69889d;
}
section.projects .project-info .project-desc {
  margin: 12px 0px 5px;
  color: #69889d;
}
section.projects .project-info .read-more {
  margin-bottom: 10px;
}

.projects:before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 50px;
  background: white;
  z-index: 0;
  top: -50px;
  z-index: 1;
  box-shadow: rgba(112, 128, 175, 0.05) 0px 16px 24px;
}
/* Project items */
.project-item {
  box-shadow: rgba(42, 51, 83, 0.12) 0px 18px 35px 0px,
    rgba(0, 0, 0, 0.06) 0px 8px 15px;
  margin: 15px auto;
  transition: all 300ms ease 0s;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #fff;
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
  background-image: url("/public/scanchange-prev.png");
  background-size: cover;
  min-height: 264px;
  background-color: rgb(255, 255, 255);
  background-repeat: no-repeat;
  /*background-position: left top;*/
  background-position: center;
}
.project-item .project-preview.quizcast {
  background-image: url("/public/quizcast-prev.jpg");
  background-size: contain;
}
.project-item .project-preview.evolventalux {
  background-image: url("/public/evolventalux-prev.jpg");
}
.project-item .project-preview.scanchange {
  background-image: url("/public/scanchange-prev.png");
}
.project-item .project-preview.autotras {
  background-image: url("/public/autotras-prev.png");
}
.project-item .project-preview.jpbooks {
  background-image: url("/public/jpbooks-prev.jpg");
}
.project-item .project-preview.hamiltonhouse {
  background-image: url("/public/hamiltonhouse-prev.jpg");
}
.project-item .project-preview.bot-for-vk {
  background-image: url("/public/botvk-prev.png");
}
</style>
