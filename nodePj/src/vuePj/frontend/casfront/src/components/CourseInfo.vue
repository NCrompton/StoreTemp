<template>
  <div class="course-page-container">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Course" icon="today" />
      <q-breadcrumbs-el :label="courseR?.code" />
      <q-breadcrumbs-el :label="`version-${versionmodel}`" />
    </q-breadcrumbs>
    <div class="course-container">
      <div class="toggle-button-box">
        <div class="course-website">
          <q-icon v-if="courseR?.website" name="link" /><a class="website-link" :href="courseR?.website">{{
              courseR?.website
          }}</a>
        </div>
        <q-btn-toggle v-if="course_details" v-model="versionmodel" class="toggle-button" :options="course_details?.map(({ version }) => {
          return { value: version, label: version.toString() }
        })" rounded color="white" toggle-color="light-blue-3" size="md" text-color="grey" toggle-text-color="grey-9"
          padding="0px 30px 0px 30px" />
      </div>
      <div class="course-info-box">
        <div class="course-code"><span>Course Code</span>
          <div class="course-data">{{ courseR?.code ?? "" }}</div>
        </div>
        <div class="course-dept"><span>Course Department</span>
          <div class="course-data">{{ courseR?.dept ?? "" }}</div>
        </div>
      </div>
    </div>
    <div v-for="detail in course_details">
      <div v-if="detail.version === Number.parseInt(versionmodel)">
        <CourseDetailInfo v-bind="detail" />
        {{ detail }}
      </div>
    </div>
    is the course
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { CourseDetail, Course } from './models';
import { getCourseDetail } from 'src/api/courseDetail'
import CourseDetailInfo from './CourseDetailInfo.vue'

export default defineComponent({
  name: "CourseInfo",
  components: { CourseDetailInfo },
  setup(props) {
    const course_details: Ref<CourseDetail[]> = ref([])
    const courseR = ref()
    getCourseDetail(props.courseid).then(({ course, coursedetails }) => { course_details.value = coursedetails, courseR.value = course })
    console.log(course_details.value)

    const conversion: string[] = ['verison 1', 'version 2', 'version 3']
    const versions = ref(course_details.value)
    console.log(`${versions} is the version`)
    const versionmodel = ref("1")


    return {
      course_details,
      versions,
      versionmodel,
      conversion,
      courseR,
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
:root
  --main-color: #88ccff
  --mp-size: 10px

.course-page-container
  padding-left: var(--mp-size)

.course-container
  display: flex
  margin-bottom: 5px
  align-items: center

  .toggle-button-box
    margin-top: 30px
    height: 100%
    align-items: flex-end

    .course-website
      margin-left: var(--mp-size)
      padding-bottom: 10px
      font-size: 20px
      transition: all

      .website-link
        text-decoration: None
        padding-left: var(--mp-size)
        color: rgb(120, 120, 180)

    &:hover
      color: blue
      .website-link
        color: rgb(140, 140, 220)

.toggle-button
  margin-top: auto
  margin-left: var(--mp-size)

.course-info-box
  border: 1px solid
  display: inline-block
  float: right
  margin-left: auto
  margin-right: 50px
  font-size: 2rem

  div
    display: flex
    align-items: center

  .course-code
    border: 1px solid
  .course-dept
    border: 1px solid

  span
    margin: 10px
    margin-right: 50px
    padding: 2px
    border: 1px solid
    position: absolute
    width: 300px
    transform: translateX(-200px)
    opacity: 0

  &:hover span
    transform: translateX(-300px)
    opacity: 1
    animation: info-slide-out 0.5s

  .course-data
    margin-left: auto

@keyframes info-slide-out
  0%
    opacity: 0
    transform: translateX(-200px)
  100%
    opacity: 1
    transform: translateX(-300px)
</style>
