<template>
  <q-toolbar class="main-area">
    <q-btn flat dense round icon="menu" aria-label="Menu" @click="enlarge" color="grey-6" class="open-drawer" />

    <q-toolbar-title class="">
      <!-- <img src="https://www.cityu.edu.hk/sites/g/files/asqsls3821/themes/site/cityu/images/logo-coloured-2019.svg"
            width="300" height="200" /> -->
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Logo_of_Seoul%2C_South_Korea.svg/420px-Logo_of_Seoul%2C_South_Korea.svg.png"
        width="300" height="200" />
    </q-toolbar-title>

    <div>Quasar v{{ $q.version }}</div>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "Navbar",
  props: {
    expand: {
      type: Function,
      default: function () {
        console.log("sidebar is not passed")
      }
    },
    value: Boolean,
  },
  setup(props) {
    return {
      enlarge() {
        console.log("expanding...")
        props.expand()
      }
    }
  }
})
</script>
<style lang="sass">
.main-area
  background-color: white
  color: black
  border-bottom: 5px solid gray
  .open-drawer
    margin-left: 30px
</style>
<style>
.main-area {}
</style>
