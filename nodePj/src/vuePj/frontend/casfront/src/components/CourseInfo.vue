<template>
  <div>
    <q-btn-toggle v-if="course_details" v-model="versionmodel" class="toggle-button" flat :options="course_details?.map(({version}) => {
      return {value: version, label: version.toString()}
    })" rounded color="blue" toggle-color="blue" />
    <div v-for="detail in course_details">
      <div v-if="detail.version === Number.parseInt(versionmodel)">
        {{detail}}
      </div>
    </div>
    is the course
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { CourseDetail } from './models';
import { getCourseDetail } from 'src/api/courseDetail'

export default defineComponent({
  name: "CourseInfo",
  components: {},
  setup(props) {
    const course_details: Ref<CourseDetail[]> = ref([])
    getCourseDetail(props.courseid).then(({ coursedetails }) => course_details.value = coursedetails)
    console.log(course_details.value)

    const conversion: string[] = ['verison 1', 'version 2', 'version 3']
    const versions = ref(course_details.value)
    console.log(`${versions} is the version`)
    const versionmodel = ref("1")

    return {
      course_details,
      versions,
      versionmodel,
      conversion
    }
  },
  props: {
    courseid: {
      type: Number,
      required: true
    }
  }
})
</script>
<style lang="sass">
.toggle-button
  border: 1px solid #88ccff
</style>
