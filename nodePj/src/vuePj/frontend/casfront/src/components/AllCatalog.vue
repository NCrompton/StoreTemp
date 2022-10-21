<template>
  <div class="wrapper">
    <div class="course-item">
      <q-item class="catalog" clickable v-ripple dense @click="openDropdown">
        <q-item-section avatar>
          <q-icon name="today" />
        </q-item-section>
        <q-item-section>
          <AllSection name="Course">Course</AllSection>
        </q-item-section>
        <!--fix-->
        <q-item-section v-if="dropped">
          <q-icon name="expand_more" size="24px" color="grey-5" right />
        </q-item-section>
        <q-item-section v-if="!dropped">
          <q-icon name="navigate_next" size="24px" color="grey-5" right />
        </q-item-section>
      </q-item>
      <q-slide-transition>
        <div v-show="dropped">
          <q-input dense outlined v-model="search" class="q-pl-sm q-pr-sm q-pb-sm q-pt-sm" label="Search Item"
            @click="searchActive = true">
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
            </template>
          </q-input>
          <div v-for="course in courses">
            <q-list id="course-list" class="course-list" dense>
              <CourseCatalog v-if="!searchActive" class="course-list-item" :key="course.course_id" v-bind="course" />
              <CourseCatalog v-else-if="course.code.includes(search)" class="course-list-item" v-bind="course" />
            </q-list>
          </div>
        </div>
      </q-slide-transition>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import CourseCatalog from './CourseCatalog.vue'
import AllSection from './AllSection.vue'
import { Course } from './models'
import { getCourse } from 'src/api/course';

export default defineComponent({
  name: "AllCatalog",
  components: {
    AllSection,
    CourseCatalog,
  },
  setup() {
    const courses: Ref<Array<Course>> = ref([])
    /* courses.value.push({ code: "AB1111", course_id: 12, dept: "TEST", subject_area: "TEST", website: "" })
    courses.value.push({ code: "AB1112", course_id: 13, dept: "TEST", subject_area: "TEST", website: "" })
    courses.value.push({ code: "AB1113", course_id: 14, dept: "TEST", subject_area: "TEST", website: "" }) */
    getCourse().then(res => courses.value = res)
    console.log(courses)

    const dropped: Ref<boolean> = ref(false)
    const searchActive: Ref<boolean> = ref(false)
    const search: Ref<string> = ref("")

    return {
      courses,
      dropped,
      search,
      searchActive
    }
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
    },
    targetItem: {
      type: String,
    }
  },
  methods: {
    openDropdown() {
      const target = document.getElementById("course-list")?.style.display
      this.dropped = !this.dropped
      console.log(target)
    }
  },
  computed: {
    dropstyle() {
      return { display: (this.dropped || !this.expanded) ? "None" : "block" }
    }
  }
})
</script>
<style lang="sass">

.course-item
  .course-list
    transition: opacity 1s ease-out
    height: 100
    opacity: 1
    animation: move-the-object 0.3s

    .course-list-item:hover
      background-color: #ccc

@keyframes move-the-object
  0%
      opacity: 0
  100%
      opacity: 1

</style>
