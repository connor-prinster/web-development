from django.urls import path

from . import views

app_name = 'blog'
urlpatterns = [
    # path to url with all blog objects listed
    path('archive', views.archive, name='archive'),
    # initializes the database
    path('init', views.init, name='init'),
    # single blog object with id='<int:blog_id>' and it's comments
    path('<int:blog_id>/', views.detail, name='detail'),
    # post comment to a blog object
    path('<int:blog_id>/comment', views.postcomment, name='comment'),
    # wipe the database
    path('sepuku', views.sepuku, name='sepuku'),
    # straight to the index page
    path('', views.index, name='index'),

    # path to the about page, deprecated now
    path('about', views.about, name='about'),
    # tips page, deprecated now
    path('tips', views.tips, name='tips'),
]