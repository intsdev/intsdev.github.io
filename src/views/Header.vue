<template>
  <b-navbar toggleable="md" type="dark" class="header-line">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <router-link :to="{name: 'home'}" is="b-navbar-brand">
      IntsDev
    </router-link>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <router-link exact :to="{name: 'home'}" is="b-nav-item">
          Portfolio
        </router-link>
        <router-link exact :to="{name: 'contacts'}" is="b-nav-item">
          Contacts
        </router-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <a href="https://vk.com/w.veber" target="_blank">
          <icon name="brands/vk" scale="1.8" color="#fff"/>
        </a>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  // Bootstrap
  import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
  import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav';
  import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';
  import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle';

  import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
  import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
  import bNavForm from 'bootstrap-vue/es/components/nav/nav-form';
  import bNavItemDropdown from 'bootstrap-vue/es/components/nav/nav-item-dropdown';

  import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item';

  import bButton from 'bootstrap-vue/es/components/button/button';

  import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';

  // FontAwesome icons
  import Icon from 'vue-awesome/components/Icon';
  import 'vue-awesome/icons/brands/vk';


  export default {
    components: { bNavbar, bNavbarNav, bNavbarBrand, bNavbarToggle, bCollapse, bNavItem, bNavForm, bFormInput, bButton, bNavItemDropdown, bDropdownItem, Icon },
    data () {
      return {

      }
    }
  }
</script>

<style>
  .header-line {
    background-color: #162c46;
  }
</style>