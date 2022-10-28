<template>
  <div class="info-box">
    <q-btn class="button-modify" rounded color="blue-5" @click="modifyState()">
      <q-icon :class="modify ? 'icon-edit' : 'icon-edit fade-out'" size="30px" name="edit" />
      <q-icon :class="modify ? 'icon-close fade-out' : 'icon-close'" size="30px" name="close" />
    </q-btn>
    <div class="course-detail-container">
      <div class="course-d">{{ name }}</div>
      <div class="course-d">{{ credit }}</div>
      <div class="course-d">{{ duration }}</div>
      <div class="course-d">{{ level }}</div>
      <div class="course-d-option">
        <div class="course-medium" id="medium-en" :isvalid="medium === 'English'">English</div>
        <div class="course-medium" id="medium-ch" :isvalid="medium === 'Chinese'">Chinese</div>
      </div>
      <div class="course-d-percent">
        <div class="course-percent" :style="{ width: (cw_percent + '%') }" :percent="cw_percent"><span
            class="course-percent-text">Course Work[{{
                cw_percent
                + '%'
            }}]</span></div>
        <div class="course-percent" :style="{ width: ((100 - (cw_percent ?? 0)) + '%') }"
          :percent="100 - (cw_percent ?? 0)"><span class="course-percent-text">Exam[{{ (100 - (cw_percent ?? 0)) + '%'
          }}]</span>
        </div>
      </div>
      <div class="course-percent-legend">
        <div class="cw-legend"></div><span class="legend-text">course work</span>
        <div class="exam-legend"></div><span class="legend-text">exam</span>
      </div>
    </div>
    <div class="course-d">{{ exam_duration }}</div>
    <div class="course-d">{{ precursor || "No Precursor" }}</div>
    <div class="course-d">{{ prerequisite || "No Prerequisite" }}</div>
    <div class="course-d">{{ equivalent || "No Equivalent" }}</div>
    <div class="course-d">{{ exclusive || "No exclusive" }}</div>
    <div class="course-d">{{ fund_mode }}</div>
    <div class="course-d-range">
      <div class="range-from">{{ cohort_from }}</div>
      <q-icon name="arrow_forward" />
      <div class="range-to">{{ cohort_to === 0 ? "~" : cohort_to }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
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
    cohort_from: Number,
    cohort_to: Number,
  },
  setup() {
    const modify: Ref<boolean> = ref(false)

    function modifyState() {
      modify.value = !modify.value
    }

    return {
      modify,
      modifyState
    }
  },
  methods: {

  }
})
</script>
<style lang="sass">
:root
  --pad: 5px
  --pad-right: 40px
  --rad: 20px
  --cw-color: rgb(120, 200, 50)
  --exam-color: rgb(200, 150, 200)

.info-box
  border: 1px solid

.button-modify
  float: right
  margin: 10px var(--pad-right) 0px 0px
  width: 46px
  height: 46px

  & *
    opacity: 1
    transition: opacity 0.3s
    position: absolute
    top: 20%
    left: 18%

  .fade-out
    opacity: 0

.course-detail-container
  display: block

.course-d
  padding: 2px

.course-d-option
  display: flex

.course-medium
  padding: 5px
  font-size: 15px
  border-radius: 5px
  margin: 2px

  &[isvalid=true]
    color: red
    border: 1px solid red

  &[isvalid=false]
    color: grey

.course-d-percent
  display: flex
  margin: var(--pad) var(--pad-right) 2px var(--pad)
  border-radius: 20px
  height: 20px
  overflow: hidden

  .course-percent
    display: flex
    align-items: center
    justify-content: center
    font-size: 10px

    .course-percent-text
      display: None
      position: absolute

    &:hover .course-percent-text
      display: flex

  .course-percent:nth-child(1)
    background-color: var(--cw-color)
  .course-percent:nth-child(2)
    background-color: var(--exam-color)

.course-percent-legend
  display: flex
  margin-left: 20px
  align-items: center

  .cw-legend
    width: 20px
    height: 20px
    background-color: var(--cw-color)
  .exam-legend
    width: 20px
    height: 20px
    background-color: var(--exam-color)
  .legend-text
    font-size: 10px
    padding: var(--pad)

.course-d-range
  display: flex
  align-items: center

  *
    padding: var(--pad)
    font-size: 20px

</style>
