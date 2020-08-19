<template>
  <b-navbar toggleable="sm" :sticky="sticky" class="header-line" :class="classFix">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <router-link :to="{ name: 'home' }" is="b-navbar-brand">
      <div class="brand-name">
        <span class="name-start">Int.</span>
        <span class="name-end">
          <span>Dev</span>
        </span>
      </div>
    </router-link>

    <b-collapse is-nav id="nav-collapse">
      <b-navbar-nav>
        <router-link exact :to="{ name: 'home' }" is="b-nav-item">Portfolio</router-link>
        <router-link exact :to="{ name: 'contacts' }" is="b-nav-item">Contacts</router-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto soc-icons">
        <div>
          <a href="https://github.com/intsdev" target="_blank" rel="noopener">
            <icon name="brands/github" scale="1.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/intsdev/"
            target="_blank"
            rel="noopener"
            class="ml-2 mr-2"
          >
            <icon name="brands/linkedin" scale="1.8" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCThJOOhQLedAt6pf_W_Te2g"
            target="_blank"
            rel="noopener"
            class="mr-2"
          >
            <icon name="brands/youtube" scale="1.8" />
          </a>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {
  BNavbar,
  BNavbarNav,
  BNavbarBrand,
  BNavbarToggle,
  BCollapse,
  BNavItem,
} from "bootstrap-vue";

// FontAwesome icons
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/brands/linkedin";
import "vue-awesome/icons/brands/youtube";
import "vue-awesome/icons/brands/github";

export default {
  name: "Header",
  components: {
    BNavbar,
    BNavbarNav,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavItem,
    Icon,
  },
  data() {
    return {
      sticky: false,
    };
  },
  computed: {
    classFix() {
      return this.sticky ? "header-fix slideInDown animated" : "";
    },
  },
  methods: {
    onScroll() {
      let headerLineTop = document.querySelector("body").getBoundingClientRect()
        .top;
      this.sticky = headerLineTop <= -650;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style>
.navbar-light .navbar-nav .show > .nav-link,
.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .nav-link.show,
.navbar-light .navbar-nav .nav-link.active {
  color: #6a889c;
}
.soc-icons a {
  color: #6a889c;
}
.soc-icons a:hover {
  color: #6eacd6;
}
.soc-icons .fa-icon {
  vertical-align: middle;
}
.header-line {
  background: #f8faff;
}
.header-fix {
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  z-index: 2;
  -webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.04);
}

.brand-name {
  color: #6a889c;
  font-weight: 700;
  display: flex;
}
.brand-name .name-start {
  border: 2px solid;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 0 5px;
  background-color: #fff;
}
.brand-name .name-end {
  color: #fff;
  background-color: #6a889c;
  border: 2px solid #6a889c;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  text-transform: uppercase;
  padding-right: 5px;
}
.brand-name .name-end span {
  font-size: 0.8em;
  position: relative;
  top: -2px;
}
</style>
