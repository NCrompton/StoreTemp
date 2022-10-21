<template>
  <q-item :href="'/course/' + course_id">
    <div class="course-box">
      <div class="course-code">
        <q-item-label>{{code}}</q-item-label>
      </div>
      <div class="id-box">
        <div class="course-id">
          <q-item-label>{{course_id}}</q-item-label>
        </div>
      </div>
    </div>
  </q-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Course } from './models'

export default defineComponent({
  setup() {

  },
  props: {
    course_id: {
      type: Number,
      required: true
    },
    code: {
      type: String,
    },
    dept: {
      type: String,
    },
    website: {
      type: String,
    },
    subject_area: {
      type: String,
    },
  }
})
</script>
<style lang="sass">
.course-box
  display: flex
  margin-left: 5px
  padding: 2px
  cursor: pointer
  width:100%

  .id-box
    display: flex
    margin-left: auto

</style>
