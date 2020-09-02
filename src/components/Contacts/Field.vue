<template>
  <div class="form-group">
    <label :for="uniqueId">{{ name }}</label>

    <transition
      name="flip"
      enter-active-class="animated flipInY"
      leave-active-class="animated flipOutY"
      mode="out-in"
    >
      <icon v-if="activated" :name="iconType" :key="iconType" :class="validClass" />
    </transition>

    <textarea
      v-if="type == 'textarea'"
      class="form-control"
      :id="uniqueId"
      rows="3"
      :value="value"
      @input="onInput"
    ></textarea>
    <input v-else :id="uniqueId" type="text" class="form-control" :value="value" @input="onInput" />
  </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon";

import "vue-awesome/icons/exclamation-circle";
import "vue-awesome/icons/check-circle";

export default {
  components: { Icon },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    pattern: {
      type: RegExp,
      default() {
        return /.*/;
      },
    },
    type: {
      type: String,
      default: "input",
    },
  },
  data() {
    return {
      activated: false,
      uniqueId: this._uid + "-" + Math.random().toString(36),
    };
  },
  created() {
    this.activated = this.value !== "";
  },
  computed: {
    isValid() {
      return this.pattern.test(this.value);
    },
    needValidateEmit() {
      return this.isValid && this.activated;
    },
    validClass() {
      return this.isValid ? "text-success" : "text-danger";
    },
    iconType() {
      return this.isValid ? "check-circle" : "exclamation-circle";
    },
  },
  watch: {
    needValidateEmit() {
      this.$emit("update:valid", this.isValid);
    },
  },
  methods: {
    onInput(e) {
      this.activated = true;
      this.$emit("update:input", e.target.value.trim());
    },
  },
};
</script>
