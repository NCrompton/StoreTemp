from django.contrib import admin
from .models import Question, Choice
from django.utils import timezone
import datetime

# Register your models here.

#admin.site.register(Question)

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class ChoiceInline2(admin.StackedInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    #fields = ['pub_date', 'question_text']
    fieldsets = [
        (None, {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date']}),
    ]
    list_display = ('question_text', 'pub_date')
    inlines = [ChoiceInline]
    inlines = [ChoiceInline2]
    @admin.display(
        boolean =True,
        ordering='pub_date',
        description='Published recently?',
    )
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=15) <= self.pub_date <= now

admin.site.register(Question, QuestionAdmin)
#admin.site.register(Choice)