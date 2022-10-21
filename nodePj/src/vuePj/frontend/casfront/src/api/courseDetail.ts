import axios from 'axios'
import {
  CourseDetail,
  CourseDetail_Attributes,
  Course,
} from '../components/models'

const PROXY = process.env.PROXY + 'coursedetail'

export async function getCourseDetail(
  courseid: number
): Promise<{ coursedetails: CourseDetail[]; course: Course }> {
  let coursedetails: CourseDetail[] = []
  let course: Course
  const res = await axios({
    method: 'get',
    url: PROXY + `/!/!/!/${courseid}`,
    data: {
      select: [...CourseDetail_Attributes],
    },
  }).catch((err) => {
    console.log(err)
  })
  coursedetails = res?.data.data[0].course_details
  course = res?.data.data
  return { course, coursedetails }
}
