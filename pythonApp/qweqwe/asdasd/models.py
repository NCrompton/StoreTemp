# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Idmap(models.Model):
    cityu_id = models.CharField(max_length=50)
    eid = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    uid = models.CharField(max_length=50)
    gp = models.CharField(max_length=50, blank=True, null=True)
    e_name = models.CharField(max_length=50)
    created_date = models.CharField(max_length=50)
    modified_date = models.CharField(max_length=50)
    db_access_user = models.CharField(max_length=50)
    timestamp = models.TextField()  # This field type is a guess.
    rhost = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'IDMap'


class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    sso_id = models.CharField(max_length=50)
    e_name = models.CharField(max_length=100)
    c_name = models.CharField(max_length=50, blank=True, null=True)
    title = models.CharField(max_length=10, blank=True, null=True)
    type = models.SmallIntegerField()
    permission = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    player_version = models.CharField(max_length=20, blank=True, null=True)
    last_logon = models.DateTimeField(blank=True, null=True)
    web_logon_name = models.CharField(max_length=50, blank=True, null=True)
    web_logon_host = models.CharField(max_length=150, blank=True, null=True)
    u_name = models.CharField(max_length=50)
    r_host = models.CharField(max_length=50)
    is_current = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'account'


class Cilo(models.Model):
    cilo_id = models.AutoField(primary_key=True)
    course_detail = models.ForeignKey('CourseDetail', models.DO_NOTHING)
    desc = models.TextField(blank=True, null=True)
    seq = models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'cilo'


class CiloAt(models.Model):
    cilo = models.OneToOneField(Cilo, models.DO_NOTHING, primary_key=True)
    course_at = models.ForeignKey('CourseAt', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'cilo_at'
        unique_together = (('cilo', 'course_at'),)


class CiloTla(models.Model):
    cilo = models.OneToOneField(Cilo, models.DO_NOTHING, primary_key=True)
    course_tla = models.ForeignKey('CourseTla', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'cilo_tla'
        unique_together = (('cilo', 'course_tla'),)


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    code = models.CharField(unique=True, max_length=10, blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    website = models.CharField(max_length=250, blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    subject_area = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course'


class CourseArchive(models.Model):
    course_archive_id = models.AutoField(primary_key=True)
    code = models.CharField(unique=True, max_length=10)
    title = models.CharField(max_length=100)
    date_created = models.DateTimeField()
    web_logon_name = models.CharField(max_length=50, blank=True, null=True)
    web_logon_host = models.CharField(max_length=150, blank=True, null=True)
    u_name = models.CharField(max_length=50)
    r_host = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'course_archive'


class CourseAt(models.Model):
    course_at_id = models.AutoField(primary_key=True)
    course_detail_id = models.IntegerField()
    title = models.TextField()
    desc = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'course_at'


class CourseDetail(models.Model):
    course_detail_id = models.AutoField(primary_key=True)
    course = models.ForeignKey(Course, models.DO_NOTHING)
    name = models.CharField(max_length=100, blank=True, null=True)
    credit = models.IntegerField(blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)
    level = models.CharField(max_length=5, blank=True, null=True)
    medium = models.CharField(max_length=20, blank=True, null=True)
    cw_percent = models.IntegerField(blank=True, null=True)
    exam_percent = models.IntegerField(blank=True, null=True)
    exam_duration = models.IntegerField(blank=True, null=True)
    precursor = models.TextField(blank=True, null=True)
    prerequisite = models.TextField(blank=True, null=True)
    equivalent = models.TextField(blank=True, null=True)
    exclusive = models.TextField(blank=True, null=True)
    fund_mode = models.CharField(max_length=25, blank=True, null=True)
    cef_course = models.BooleanField(blank=True, null=True)
    block_transfer = models.BooleanField(blank=True, null=True)
    remark = models.TextField(blank=True, null=True)
    version = models.SmallIntegerField(blank=True, null=True)
    is_current = models.SmallIntegerField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    grade_pattern = models.CharField(max_length=20, blank=True, null=True)
    cohort_from = models.IntegerField()
    cohort_to = models.IntegerField()
    aim = models.TextField(blank=True, null=True)
    grade_remark = models.TextField(blank=True, null=True)
    kw_syllabus = models.TextField(blank=True, null=True)
    syllabus = models.TextField(blank=True, null=True)
    u_name = models.CharField(max_length=50)
    r_host = models.CharField(max_length=50)
    web_logon_name = models.CharField(max_length=50, blank=True, null=True)
    web_logon_host = models.CharField(max_length=150, blank=True, null=True)
    text_reading = models.TextField(blank=True, null=True)
    online_reading = models.TextField(blank=True, null=True)
    semester_id = models.IntegerField(blank=True, null=True)
    equivalent_old = models.TextField(blank=True, null=True)
    timestamp = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'course_detail'


class CourseDetailLog(models.Model):
    course_detail_id = models.IntegerField()
    course_id = models.IntegerField()
    name = models.CharField(max_length=100, blank=True, null=True)
    credit = models.IntegerField(blank=True, null=True)
    duration = models.IntegerField(blank=True, null=True)
    level = models.CharField(max_length=5, blank=True, null=True)
    medium = models.CharField(max_length=20, blank=True, null=True)
    cw_percent = models.IntegerField(blank=True, null=True)
    exam_percent = models.IntegerField(blank=True, null=True)
    exam_duration = models.IntegerField(blank=True, null=True)
    precursor = models.TextField(blank=True, null=True)
    prerequisite = models.TextField(blank=True, null=True)
    equivalent = models.TextField(blank=True, null=True)
    exclusive = models.TextField(blank=True, null=True)
    fund_mode = models.CharField(max_length=25, blank=True, null=True)
    cef_course = models.BooleanField(blank=True, null=True)
    block_transfer = models.BooleanField(blank=True, null=True)
    remark = models.TextField(blank=True, null=True)
    version = models.SmallIntegerField(blank=True, null=True)
    is_current = models.SmallIntegerField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    grade_pattern = models.CharField(max_length=20, blank=True, null=True)
    cohort_from = models.IntegerField()
    cohort_to = models.IntegerField()
    aim = models.TextField(blank=True, null=True)
    grade_remark = models.TextField(blank=True, null=True)
    kw_syllabus = models.TextField(blank=True, null=True)
    syllabus = models.TextField(blank=True, null=True)
    u_name = models.CharField(max_length=50)
    r_host = models.CharField(max_length=50)
    web_logon_name = models.CharField(max_length=50, blank=True, null=True)
    web_logon_host = models.CharField(max_length=150, blank=True, null=True)
    text_reading = models.TextField(blank=True, null=True)
    online_reading = models.TextField(blank=True, null=True)
    semester_id = models.IntegerField(blank=True, null=True)
    equivalent_old = models.TextField(blank=True, null=True)
    timestamp = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'course_detail_log'


class CourseStaff(models.Model):
    course = models.OneToOneField(Course, models.DO_NOTHING, primary_key=True)
    staff_sso_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'course_staff'
        unique_together = (('course', 'staff_sso_id'),)


class CourseTla(models.Model):
    course_tla_id = models.AutoField(primary_key=True)
    course_detail_id = models.IntegerField()
    title = models.TextField()
    desc = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'course_tla'


#class DjangoContentType(models.Model):
#    name = models.CharField("django test", max_length=100)
#    app_label = models.CharField(max_length=100)
#    model = models.CharField(max_length=100)

#    class Meta:
#        managed = False
#        db_table = 'django_content_type'
#        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class People(models.Model):
    section_id = models.IntegerField(blank=True, null=True)
    section_name = models.CharField(max_length=200, blank=True, null=True)
    is_tdshow = models.BooleanField()
    title = models.CharField(max_length=50, blank=True, null=True)
    e_name = models.CharField(max_length=100, blank=True, null=True)
    c_name = models.CharField(max_length=50, blank=True, null=True)
    sso_id = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'people'


class PgCoursePilo(models.Model):
    course = models.OneToOneField(Course, models.DO_NOTHING, primary_key=True)
    pilo = models.ForeignKey('Pilo', models.DO_NOTHING)
    prog_grp = models.ForeignKey('ProgGrp', models.DO_NOTHING)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    type = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'pg_course_pilo'
        unique_together = (('course', 'pilo', 'prog_grp'),)


class Pilo(models.Model):
    pilo_id = models.AutoField(primary_key=True)
    programme = models.ForeignKey('Programme', models.DO_NOTHING)
    desc = models.TextField(blank=True, null=True)
    seq = models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pilo'


class ProgCourseOffer(models.Model):
    prog_course_offer_id = models.AutoField(primary_key=True)
    programme = models.ForeignKey('Programme', models.DO_NOTHING)
    course = models.ForeignKey(Course, models.DO_NOTHING)
    code_remark = models.TextField(blank=True, null=True)
    title_remark = models.TextField(blank=True, null=True)
    unit_remark = models.TextField(blank=True, null=True)
    prerequisite_remark = models.TextField(blank=True, null=True)
    precursor_remark = models.TextField(blank=True, null=True)
    equivalent_remark = models.TextField(blank=True, null=True)
    equivalent_old_remark = models.TextField(blank=True, null=True)
    exclusive_remark = models.TextField(blank=True, null=True)
    offered_sem = models.TextField(blank=True, null=True)
    remark = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    web_logon_name = models.CharField(max_length=50, blank=True, null=True)
    web_logon_host = models.TextField(blank=True, null=True)
    u_name = models.CharField(max_length=50)
    r_host = models.TextField()
    timestamp = models.TextField()  # This field type is a guess.
    is_show_exclusive_with_title = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'prog_course_offer'


class ProgGrp(models.Model):
    prog_grp_id = models.AutoField(primary_key=True)
    programme = models.ForeignKey('Programme', models.DO_NOTHING)
    desc = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    seq = models.SmallIntegerField()
    remark = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'prog_grp'


class ProgGrpCourse(models.Model):
    prog_grp_course_id = models.AutoField(primary_key=True)
    prog_grp = models.ForeignKey(ProgGrp, models.DO_NOTHING)
    course = models.ForeignKey(Course, models.DO_NOTHING)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'prog_grp_course'
        unique_together = (('prog_grp', 'course'),)


class ProgStaff(models.Model):
    programme = models.OneToOneField('Programme', models.DO_NOTHING, primary_key=True)
    staff_sso_id = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'prog_staff'
        unique_together = (('programme', 'staff_sso_id'),)


class Programme(models.Model):
    programme_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    award_title = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=20, blank=True, null=True)
    alias = models.CharField(max_length=40, blank=True, null=True)
    dept = models.CharField(max_length=10, blank=True, null=True)
    mode = models.CharField(max_length=20, blank=True, null=True)
    fund_mode = models.CharField(max_length=25, blank=True, null=True)
    cohort = models.CharField(max_length=8, blank=True, null=True)
    intake = models.CharField(max_length=50, blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    web_logon_name = models.CharField(max_length=50, blank=True, null=True)
    web_logon_host = models.CharField(max_length=150, blank=True, null=True)
    u_name = models.CharField(max_length=50)
    r_host = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'programme'
        unique_together = (('code', 'cohort'),)


class Report(models.Model):
    report_id = models.AutoField(primary_key=True)
    account = models.ForeignKey(Account, models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=50, blank=True, null=True)
    desc = models.TextField(blank=True, null=True)
    password = models.CharField(max_length=256, blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    fields = models.TextField(blank=True, null=True)
    criteria = models.TextField(blank=True, null=True)
    view = models.CharField(max_length=100, blank=True, null=True)
    is_share = models.BooleanField()
    type = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'report'


class Semester(models.Model):
    semester_id = models.AutoField(primary_key=True)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    year = models.CharField(max_length=10)
    code = models.CharField(max_length=5, blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'semester'


class SemesterCourse(models.Model):
    semester_course_id = models.AutoField(primary_key=True)
    course_detail = models.ForeignKey(CourseDetail, models.DO_NOTHING, blank=True, null=True)
    semester = models.ForeignKey(Semester, models.DO_NOTHING)
    credit = models.IntegerField(blank=True, null=True)
    capacity = models.CharField(max_length=50, blank=True, null=True)
    c_hr = models.CharField(max_length=50, blank=True, null=True)
    t_hr = models.CharField(max_length=50, blank=True, null=True)
    l_hr = models.CharField(max_length=50, blank=True, null=True)
    s_hr = models.CharField(max_length=50, blank=True, null=True)
    remark = models.TextField(blank=True, null=True)
    is_current = models.BooleanField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    sem_hr = models.CharField(max_length=50, blank=True, null=True)
    sl_hr = models.CharField(max_length=50, blank=True, null=True)
    tutorial = models.CharField(max_length=50, blank=True, null=True)
    staff = models.CharField(max_length=150, blank=True, null=True)
    prog_name = models.CharField(max_length=100, blank=True, null=True)
    prog_repeat = models.BooleanField()
    prog_stu_num = models.CharField(max_length=50, blank=True, null=True)
    prog_year = models.CharField(max_length=50, blank=True, null=True)
    prog_cohort = models.CharField(max_length=50, blank=True, null=True)
    prog_intake = models.CharField(max_length=50, blank=True, null=True)
    prog_mode = models.CharField(max_length=50, blank=True, null=True)
    prog_dept = models.CharField(max_length=50, blank=True, null=True)
    prog_course_type = models.CharField(max_length=50, blank=True, null=True)
    prog_fund_mode = models.CharField(max_length=50, blank=True, null=True)
    web_logon_name = models.CharField(max_length=50, blank=True, null=True)
    web_logon_host = models.CharField(max_length=50, blank=True, null=True)
    u_name = models.CharField(max_length=50)
    r_host = models.CharField(max_length=50)
    code = models.CharField(max_length=10, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'semester_course'


class SemesterCourseLog(models.Model):
    semester_course_id = models.IntegerField()
    course_detail_id = models.IntegerField(blank=True, null=True)
    semester_id = models.IntegerField()
    credit = models.IntegerField(blank=True, null=True)
    capacity = models.CharField(max_length=50, blank=True, null=True)
    c_hr = models.CharField(max_length=50, blank=True, null=True)
    t_hr = models.CharField(max_length=50, blank=True, null=True)
    l_hr = models.CharField(max_length=50, blank=True, null=True)
    s_hr = models.CharField(max_length=50, blank=True, null=True)
    remark = models.TextField(blank=True, null=True)
    is_current = models.BooleanField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    sem_hr = models.CharField(max_length=50, blank=True, null=True)
    sl_hr = models.CharField(max_length=50, blank=True, null=True)
    tutorial = models.CharField(max_length=50, blank=True, null=True)
    staff = models.CharField(max_length=150, blank=True, null=True)
    prog_name = models.CharField(max_length=100, blank=True, null=True)
    prog_repeat = models.BooleanField()
    prog_stu_num = models.CharField(max_length=50, blank=True, null=True)
    prog_year = models.CharField(max_length=50, blank=True, null=True)
    prog_cohort = models.CharField(max_length=50, blank=True, null=True)
    prog_intake = models.CharField(max_length=50, blank=True, null=True)
    prog_mode = models.CharField(max_length=50, blank=True, null=True)
    prog_dept = models.CharField(max_length=50, blank=True, null=True)
    prog_course_type = models.CharField(max_length=50, blank=True, null=True)
    prog_fund_mode = models.CharField(max_length=50, blank=True, null=True)
    web_logon_name = models.CharField(max_length=50, blank=True, null=True)
    web_logon_host = models.CharField(max_length=50, blank=True, null=True)
    u_name = models.CharField(max_length=50)
    r_host = models.CharField(max_length=50)
    code = models.CharField(max_length=10, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    action_date = models.DateTimeField()
    action = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'semester_course_log'


class StudyPlan(models.Model):
    study_plan_id = models.AutoField(primary_key=True)
    programme = models.ForeignKey(Programme, models.DO_NOTHING)
    title = models.CharField(max_length=50, blank=True, null=True)
    desc = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'study_plan'


class StudyPlanGrp(models.Model):
    study_plan_grp_id = models.AutoField(primary_key=True)
    study_plan = models.ForeignKey(StudyPlan, models.DO_NOTHING)
    semester_id = models.IntegerField()
    title = models.TextField()
    desc = models.TextField()
    credit_min = models.IntegerField()
    credit_max = models.IntegerField(blank=True, null=True)
    remark = models.TextField(blank=True, null=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'study_plan_grp'


class Sysdiagrams(models.Model):
    name = models.CharField(max_length=128)
    principal_id = models.IntegerField()
    diagram_id = models.AutoField(primary_key=True)
    version = models.IntegerField(blank=True, null=True)
    definition = models.BinaryField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sysdiagrams'
        unique_together = (('principal_id', 'name'),)
