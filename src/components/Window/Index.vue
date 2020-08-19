<template>
  <div>
    <div class="window" :class="windowStyle" v-show="!desktopShow">
      <div class="bar">
        <div class="window-nav" @click="onHide">
          <div class="nav-btn nav-close">
            <span>
              <icon name="times" width="8" />
            </span>
          </div>
          <div class="nav-btn nav-hide">
            <span>
              <icon name="minus" width="8" />
            </span>
          </div>
          <div class="nav-btn nav-fullscreen">
            <span>
              <icon name="sort" width="8" />
            </span>
          </div>
        </div>
      </div>

      <!-- terminals -->
      <keep-alive>
        <component v-bind:is="currentComponent"></component>
      </keep-alive>
    </div>

    <div v-show="desktopShow" class="app-hide">
      <div v-for="(icon, ind) in icons" class="terminal-icon" :key="ind">
        <img @click="onShow(icon)" :src="`/chat/${icon.icon}`" alt />
      </div>
    </div>
  </div>
</template>

<script>
import AppTerminal from "./AppTerminal";
import AppContacts from "./AppContacts";
import AppInfo from "./AppInfo";

import Icon from "vue-awesome/components/Icon";

import "vue-awesome/icons/times";
import "vue-awesome/icons/minus";
import "vue-awesome/icons/sort";

export default {
  components: { AppTerminal, AppContacts, AppInfo, Icon },
  data() {
    return {
      currentComponent: "AppTerminal",
      desktopShow: false,
      icons: [
        { id: "AppTerminal", icon: "terminal.png", style: "dark" },
        { id: "AppContacts", icon: "phone.png", style: "light" }, // book.png
        // { id: "AppContacts", icon: "book.png", style: "light" },
        { id: "AppInfo", icon: "contact.png", style: "light" },
      ],
    };
  },
  computed: {
    windowStyle() {
      return this.icons.find((x) => x.id == this.currentComponent).style;
    },
  },
  methods: {
    onHide() {
      this.desktopShow = !this.desktopShow;
    },
    onShow({ id }) {
      this.currentComponent = id;
      this.desktopShow = !this.desktopShow;
    },
  },
};
</script>


<style scoped>
.window.light .bar {
  background: #d6e4f3;
}
/* Icons  */
.app-hide {
  margin-top: 3rem !important;
}
.terminal-icon {
  width: 75px;
  cursor: pointer;
  display: inline-block;
  transition: all 0.1s ease-in-out;
  margin-right: 15px;
  margin-bottom: 15px;
}
.terminal-icon img {
  width: 100%;
}
.terminal-icon:hover {
  transform: scale(1.05);
}

/* terminal */
.window {
  margin: 2rem auto 2rem;
  box-shadow: 0 0.25rem 0.5rem #12181e;
  border-radius: 0.5rem 0.5rem 0 0;
}

.window .bar {
  background: #191919;
  height: 36px;
  border-radius: 0.5rem 0.5rem 0 0;
}

/*.window .window-btn, .window .window-btn::before, .window .window-btn::after {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    display: block;
  }

  .window .window-btn {
    background: #f6b73e;
    position: relative;
    margin-left: 38px;
    top: 12px;
  }
  .window .window-btn::before, .window .window-btn::after {
    content: " ";
    position: absolute;
  }
  .window .window-btn::before {
    background: #f55551;
    margin-left: -20px;
  }
  .window .window-btn::after {
    background: #32c146;
    margin-left: 20px;
  }*/

.window .window-nav {
  padding-top: 8px;
  padding-left: 12px;
  cursor: default;
  display: inline-block;
}
.window .window-nav:hover .nav-btn span {
  visibility: visible;
}

.window .window-nav .nav-btn {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  opacity: 1;
  display: inline-block;
  margin-right: 7px;
  text-align: center;
}
.window .window-nav .nav-close {
  background-color: #f55551;
}

.window .window-nav .nav-hide {
  background-color: #f6b73e;
}
.window .window-nav .nav-fullscreen {
  background-color: #32c146;
}
.window .window-nav .nav-btn span {
  font-size: 10px;
  position: relative;
  top: -4px;
  visibility: hidden;
}
.window .window-nav .nav-fullscreen span svg {
  top: -8px;
  transform: rotate(45deg);
}
</style>