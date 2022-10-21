<template>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CourseDetail, CourseDetail_Attributes } from './models'

export default defineComponent({
  name: "CourseDetailInfo",
  props: {
    name: String,
    course_detail_id: Number,
    course_id: Number,
    credit: Number,
    duration: Number,
    level: String,
    medium: String,
    cw_percent: Number,
    exam_duration: Number,
    precursor: String,
    prerequisite: String,
    equivalent: String,
    exclusive: String,
    fund_mode: String,
    version: Number,
  },
  setup(props) {

  }
})
</script>
