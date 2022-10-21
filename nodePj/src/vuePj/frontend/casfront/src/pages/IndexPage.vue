<template>
  <q-page class="row items-center justify-evenly">
    <example-component title="Example component" active :todos="todos" :meta="meta"></example-component>
    <ul>
      <li v-for="code in codes" v-bind:key="code">
        {{code}}
      </li>
    </ul>
    <button @click="updateData" class="renew">Update</button>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta, Course } from '../components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref } from 'vue';
import { getCourse } from "../api/course"

export default defineComponent({
  name: 'IndexPage',
  components: { ExampleComponent },
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 1200
    });
    const courses = ref<Course[]>()
    getCourse().then((res) => {
      console.log(res)
      courses.value = res
    }
    )
    const codes = ref<string[]>(["a", "b"])
    return { todos, meta, codes, courses };
  },
  methods: {
    updateData(event: any) {
      this.codes = this.courses?.map((course) => course.code) ?? []
      console.log(event)
    }
  }
});
</script>
