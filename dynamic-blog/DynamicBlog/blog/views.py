from django.shortcuts import render, reverse, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.utils import timezone

from time import strftime, time
import datetime
import random

from .models import Blog, Comment

from .functions import randomIpsumBlog, randomIpsumComment, randomIpsumWord

# returns the index page with 3 blog objects from the databse
def index(request):
    # says to go to the index page and returns the 
    # time and the las three blogs posted
    return render(request, 
            'blog/index.html',
            { 
                # the current time
                'now': datetime.datetime.now(),
                # the three latest blogs
                'blogs': Blog.objects.order_by('-pub_date')[:3]
                })

# returns the aboutMe page 
def about(request):
    return render(request,
            'blog/aboutMe.html',
            # the current time
            { 'now': datetime.datetime.now() })

# returns the tip page
def tips(request):
    return render(request, 
            'blog/techTips.html',
            # the current time
            { 'now': datetime.datetime.now() })

# fills the database with 6 Blog objects
def init(request):
    #--------------------------------------------------------------------------------------#
    # delete all blog objects and their comments (Can be Removed and Just Use blog/sepuku) #
    #--------------------------------------------------------------------------------------#
    for b in Blog.objects.all():
        b.delete()
    #--------------------------------------------------------------------------------------#

    # seeds it with a constantly changing seed
    random.seed(datetime.datetime.now())
    #generates 10 blogs with five comments each
    for i in range(10):
        # create a single Blog object
        blogObj = Blog(content=str(randomIpsumBlog()),
                # title is generic except for a single LI word
                title = "Post About " + str(randomIpsumWord()),
                # username is generic except for a number
                author = "cool_guy" + str(random.randint(11, 99) + 1) + "@overcompensating.oops",
                # said it's published like right now
                pub_date = timezone.now())
        blogObj.save()
        # three comments will be attached to Blog b
        for j in range(5):
            c = Comment(title="comment_" + str(j + 1),
                        # almost completely generic email
                        author = "notRussianBot" + str(random.randint(11, 99) + 1) + "@totally.notrussia",
                        # it's publishing date is rn
                        pub_date = timezone.now(),
                        # the meat of the comment
                        content = randomIpsumComment(),
                        # the foreign key to the Blog object
                        blog_fk = blogObj)
            c.save()
    return HttpResponseRedirect(reverse('blog:index'))

# cleans all Blog objects (and their comments) from the database
def sepuku(request):
    # delete all blog objects and their comments
    for b in Blog.objects.all():
        b.delete()
    # return user to the index page
    return redirect('blog:index')

# shows all the blog posts in the database
def archive(request):
    return render(request,
            'blog/archive.html',
            {
                # send in all the blogs from latest to oldest
                'blogs': Blog.objects.order_by('-pub_date')
                })

# show a single untruncated blog post with comments underneath
def detail(request, blog_id):
    # get a single blog object
    b = Blog.objects.all().get(id=blog_id)

    return render(request, 
            'blog/detail.html',
            { 
                # Single blog object
                'blog': b,
                # all comments associated with the blog object above
                'comments': b.comments.all().order_by('-pub_date'),
                })

# grab data from the comment form and create a Comment object from it
def postcomment(request, blog_id):
    #generic comment
    comment = Comment()
    # fk is the blog whose id we passed in
    comment.blog_fk = Blog.objects.all().get(pk = blog_id)
    # title was passed in POST
    comment.title = request.POST['title']
    # author was passed in POST
    comment.author = request.POST['user_mail']
    # get time as of right now
    comment.pub_date = datetime.datetime.now()
    # content from POST
    comment.content = request.POST['user_message']

    # save the comment created above
    comment.save()

    # redirect the user to the original detail page
    return HttpResponseRedirect(reverse('blog:detail', args=(blog_id,)))