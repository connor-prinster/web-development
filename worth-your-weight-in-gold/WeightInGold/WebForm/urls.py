from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin

from . import views

app_name = 'webform'
urlpatterns = [
    path('', views.index, name='index'),
]