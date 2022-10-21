<template>
  <q-page>
    <div>Course Details</div>
    <CourseInfo :courseid="id" />
  </q-page>
</template>
<script lang="ts">
import { defineComponent, } from 'vue';
import CourseInfo from '../components/CourseInfo.vue'

export default defineComponent({
  name: 'CoursePage',
  components: {
    CourseInfo
  },
  setup() {
    const id: number = 0

    return {
      id
    }
  },
  created() {
    const courseid: string = typeof this.$route.params.courseid === 'string' ? this.$route.params.courseid : "0"
    this.id = Number.parseInt(courseid)
  }
})
</script>
