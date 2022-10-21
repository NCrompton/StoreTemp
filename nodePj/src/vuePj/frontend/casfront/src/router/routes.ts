import { RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import IndexPage from '../pages/IndexPage.vue'
import CoursePage from '../pages/CoursePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    name: 'main',
    children: [
      { path: 'index', name: 'index', component: IndexPage },
      {
        path: 'course/:courseid',
        name: 'course',
        component: CoursePage,
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
