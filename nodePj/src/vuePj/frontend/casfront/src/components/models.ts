export interface Todo {
  id: number
  content: string
}

export interface Meta {
  totalCount: number
}

export interface Course {
  course_id: number
  code: string
  dept: string
  website?: string
  subject_area?: string
}

export interface CourseDetail {
  course_detail_id: number
  course_id: number
  name: string
  credit: number
  duration: number
  level: string
  medium: string
  cw_percent: number
  exam_duration: number
  precursor: string
  prerequisite: string
  equivalent: string
  exclusive: string
  fund_mode: string
  version: number
}

export const CourseDetail_Attributes = [
  'course_detail_id',
  'course_id',
  'name',
  'credit',
  'duration',
  'level',
  'medium',
  'cw_percent',
  'exam_duration',
  'precursor',
  'prerequisite',
  'equivalent',
  'exclusive',
  'fund_mode',
  'version',
]
