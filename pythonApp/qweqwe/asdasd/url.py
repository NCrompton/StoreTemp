from django.urls import path
from . import views
from .views import ApiView

app_name = 'asdasd'

urlpatterns = [
    path('', views.index, name="index"),
    path('api/', ApiView.as_view(), name="api"),
]