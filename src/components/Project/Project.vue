<template>
  <div>
    <div class="container" v-if="getProject(name)">
      <section class="block">
        <component :is="name"></component>
      </section>
    </div>
    <e404 v-else></e404>
  </div>
</template>

<script>
  import E404 from './../E404';
  import Jpbooks from './views/Jpbooks';
  import Autotras from './views/Autotras';
  import Scanchange from './views/Scanchange';
  import Hamiltonhouse from './views/Hamiltonhouse';
  import BotForVk from './views/Botvk';

  import { mapGetters } from 'vuex';

  export default {
    components: {
      E404, Jpbooks, Autotras, Scanchange, Hamiltonhouse, BotForVk
    },
    props: ['name'],
    computed: {
      ...mapGetters('projects', {
        projects: 'all',
        getProject: 'get'
      })
    }
  }
</script>