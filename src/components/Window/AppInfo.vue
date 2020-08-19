<template>
  <div class="window-contacts">
    Telegram:
    <a href="https://t.me/intsdev" target="_blank">@intsdev</a>
    <br />Skype:
    <a href="skype:intdevs?chat">intdevs</a>
    <br />

    <router-link :to="{ name: 'contacts' }">Форма обратной связи</router-link>
    <br />
    <a href="https://github.com/intsdev" target="_blank">GitHub</a>
  </div>
</template>

<style>
.window-contacts {
  padding: 10px 30px;
}
</style>
