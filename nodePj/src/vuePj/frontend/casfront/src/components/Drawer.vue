<template>
  <q-drawer :model-value="opend" show-if-above bordered :mini="mini" @click="" mini-to-overlay :width="200">
    <template v-slot:mini>
      <q-scroll-area class="fit mini-slot cursor-pointer" @click="mini = false">
        <div class="q-py-lg">
          <div class="column items-center">
            <q-icon name="today" color="blue" class="mini-icon" size="30px" />
            <q-icon name="today" color="orange" class="mini-icon" size="30px" />
            <q-icon name="send" color="purple" class="mini-icon" size="30px" />
            <q-icon name="drafts" color="teal" class="mini-icon" size="30px" />
          </div>
        </div>
      </q-scroll-area>
    </template>
    <q-scroll-area class="fit">
      <q-list>
        <q-item-label header>
          CAS
        </q-item-label>
        <AllCatalog :items="courses" />
        <AllCatalog />
      </q-list>
      <div class="q-mini-drawer-hide absolute" style="top: 10px; right: 17px">
        <q-btn dense round unelevated color="accent" icon="chevron_left" @click="mini = true" />
      </div>
    </q-scroll-area>
  </q-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, type Ref } from "vue"
import { Course } from "./models"
import EssentialLink from "components/EssentialLink.vue"
import CourseCatalog from "./CourseCatalog.vue"
import AllCatalog from "./AllCatalog.vue"

export default defineComponent({
  name: "Drawer",
  components: {
    EssentialLink,
    CourseCatalog,
    AllCatalog
  },
  props: {
    opend: {
      type: Boolean,
      default: false
    },
    courses: {
      type: Array<Course>
    }
  },
  setup(props) {

    const mini = ref(true)

    return {
      mini
    }
  },
  mounted() {

  }
})
</script>
<style lang="sass">
.mini-icon
  padding-top: 20px
</style>
