<template>
  <div>
    <div class="container" v-if="getProject(name)">
      <section class="block">
        <div v-html="projectData"></div>
      </section>
    </div>
    <e404 v-else></e404>
  </div>
</template>

<script>
  import E404 from './../E404';
  import { mapGetters, mapActions } from 'vuex';

  import hljs from 'highlight.js/lib/highlight';
  import javascript from 'highlight.js/lib/languages/javascript';
  hljs.registerLanguage('javascript', javascript);

  // import 'highlight.js/styles/dracula.css'
  // import 'highlight.js/styles/solarized-dark.css'
  import 'highlight.js/styles/solarized-light.css'
  // import 'highlight.js/styles/monokai-sublime.css'

  export default {
    components: { E404 },
    props: ['name'],
    data() {
      return {
        projectData: ''
      }
    },
    computed: {
      ...mapGetters('projects', {
        getProject: 'get'
      })
    },
    created() {
      this.$store.dispatch('projects/loadProject', {name: this.name}).then((response) => {
        this.projectData = response.data;
      });
    }
  }
</script>