<template>
  <div>
    <div class="container" v-if="getProject(name)">
      <section class="block"><div v-html="projectData"></div></section>
    </div>
    <e404 v-else></e404>
  </div>
</template>

<script>
import E404 from "./../E404";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { E404 },
  props: ["name"],
  data() {
    return {
      projectData: ""
    };
  },
  computed: {
    ...mapGetters("projects", {
      getProject: "get"
    })
  },
  methods: {
    load() {
      this.$store
        .dispatch("projects/loadProject", { name: this.name })
        .then(response => {
          this.projectData = response.data;
        });
    }
  },
  watch: {
    name() {
      this.load();
    }
  },
  created() {
    this.load();
  }
};
</script>
