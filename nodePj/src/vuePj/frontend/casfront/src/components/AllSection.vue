<template>
  <q-item-section>
    <q-item-label header>
      {{name}}
    </q-item-label>
  </q-item-section>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
  name: 'AllSection',
  setup() {

  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>
