<template>
  <q-drawer v-if="opend" show-if-above bordered :mini="mini" @mouseover="mini = false" @mouseout="mini = true"
    mini-to-overlay :width="200">
    <q-scroll-area class="fit">
      <q-list>
        <q-item-label header>
          CAS
        </q-item-label>
        <AllCatalog :expanded="!mini" />
        <AllCatalog :expanded="!mini" />
      </q-list>
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
