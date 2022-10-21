import axios from 'axios'
import { Course } from '../components/models'

const PROXY = process.env.PROXY + 'course'

export async function getCourse() {
  let courses: Course[] = []
  const res = await axios({
    method: 'get',
    url: PROXY + '/!',
    data: {
      select: ['code', 'course_id'],
    },
  }).catch((err) => {
    console.log(err)
  })
  console.log(res?.status)
  courses = res?.data.data
  return courses
}

export async function getCourseInfo(id: number) {
  let course: Course
  const res = await axios({
    method: 'GET',
    url: PROXY + `/${id}`,
  }).catch((err) => {
    console.log(err)
  })
  course = res?.data.data
  return course
}
