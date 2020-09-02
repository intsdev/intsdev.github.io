<template>
  <div>
    <head-section></head-section>
    <skills-section></skills-section>
    <projects-section></projects-section>
  </div>
</template>

<script>
import Vue from "vue";
import VueScrollTo from "vue-scrollto";
Vue.use(VueScrollTo);

/* Sections */
import skillsSection from "./SkillsSection";
import headSection from "./HeadSection";
import projectsSection from "./ProjectsSection";

export default {
  components: { headSection, skillsSection, projectsSection },
  data() {
    return {};
  },
};
</script>