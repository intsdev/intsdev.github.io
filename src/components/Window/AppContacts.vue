<template>
  <div class="window-contacts">
    <contacts></contacts>
  </div>
</template>

<script>
import Contacts from "@/components/Contacts/Index";

export default {
  components: { Contacts },
  data() {
    return {};
  },
};
</script>

<style>
.window-contacts {
  padding: 10px 30px;
}
</style>
