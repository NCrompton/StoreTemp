<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Navbar :expand="toggleLeftDrawer" />
    </q-header>
    <div>
    </div>
    <Drawer :opend="leftDrawerOpen" :courses="courses" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import Navbar from 'components/Navbar.vue'
import Drawer from "components/Drawer.vue"
import { Course } from 'src/components/models';
import { getCourse } from 'src/api/course';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    Navbar,
    Drawer
  },

  setup() {
    const leftDrawerOpen = ref(false)

    const courses: Ref<Array<Course>> = ref([])
    getCourse().then(res => { courses.value = res })
    console.log("this courses is" + courses)

    return {
      leftDrawerOpen,
      courses,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
});
</script>
