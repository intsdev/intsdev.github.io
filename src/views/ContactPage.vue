<template>
  <div>
    <div class="container">
      <section class="block">
        <h1>Contact</h1>
        <hr />
        <p>
          Вы работаете над чем-то великим? Я хочу помочь вам в этом! Напишите
          мне и мы начнем работу над вашим проектом! Just do it!
        </p>
        <hr />

        <transition
          name="flip"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        >
          <contacts></contacts>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import Contacts from "@/components/Contacts/Index";

export default {
  components: { Contacts },
};
</script>
