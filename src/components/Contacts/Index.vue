<template>
  <div>
    <form v-if="!isDone" action="" @submit.prevent="sendMessage">
      <fieldset :disabled="isSending">
        <appField v-for="(item, i) in info"
              :name="item.name"
              :value="item.value"
              :pattern="item.pattern"
              :key="i"
              :type="item.type"
              @update:input="onUpdateInput(i, $event)"
              @update:valid="onValidInput(i, $event)">
        </appField>

        <button class="btn btn-primary" :disabled="!formReady">
          <span v-if="isSending"><icon  name="spinner" class="fa-pulse"/> One moment please</span>
          <span v-else>Отправить</span>
        </button>
      </fieldset>
    </form>
    <div v-else>
      <b-alert show dismissible variant="success" @dismissed="onAlertClose">
        <h4 class="text-center">Спасибо за Ваше сообщение! Я свяжусь с вами как можно скорее!</h4>
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

// Custom components
import appField from './Field';

// FontAwesome icons
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/spinner';

// Bootstrap
import bAlert from 'bootstrap-vue/es/components/alert/alert';

export default {
  components: { appField, Icon, bAlert },
  data () {
    return {
      controls: []
    }
  },
  created() {
    this.stateReset();
  },
  computed: {
    ...mapGetters('contacts', {
      info: 'getFormInfo',
      isSending: 'isSending',
      isDone: 'isDone',
    }),
    fieldsDone(){
      return this.controls.reduce((total, item) => {
        return total + (item.valid ? 1 : 0);
      }, 0);
    },
    formReady(){
      return this.fieldsDone === this.controls.length;
    }
  },
  watch: {
    isDone(val) {
      if(val === true) {
        this.stateReset();
      }
    }
  },
  methods: {
    ...mapMutations('contacts', {
      updateInfo: 'updateFormInfo',
      clearForm: 'clearForm',
    }),
    ...mapActions('contacts', {
      sendMessage: 'send'
    }),
    onAlertClose() {
      this.clearForm();
    },
    onUpdateInput(i, val) {
      this.updateInfo({i: i, value: val});
    },
    onValidInput(i, val) {
      this.controls[i].valid = val;
    },
    stateReset() {
      this.controls = this.info.map(item => {
        return { valid: false }
      });
    },
  }
}
</script>
