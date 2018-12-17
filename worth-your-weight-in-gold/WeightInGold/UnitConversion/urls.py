from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin

from . import views

app_name = 'conversion'
urlpatterns = [
    path('', views.conversions, name='API'),
    path('init/', views.init, name='init'),
]