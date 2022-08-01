from django.contrib import admin
from .models import Course, CourseDetail, CourseStaff

class CourseDetailInline(admin.TabularInline):
    model = CourseDetail
    extra = 3

class CourseStaffInline(admin.StackedInline):
    model = CourseStaff
    extra = 3

class CourseAdmin(admin.ModelAdmin):
    using = 'cas'

    list_display = ('course_id', 'code', 'dept')
    inlines = [CourseDetailInline, CourseStaffInline]

    


admin.site.register(Course, CourseAdmin)

# Register your models here.
