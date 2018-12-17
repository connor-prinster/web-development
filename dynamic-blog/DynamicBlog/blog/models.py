from django.db import models

class Blog(models.Model):
    # content
    content = models.CharField(max_length=1024)
    # title
    title   = models.CharField(max_length=100)
    # author of post
    author  = models.CharField(max_length=32)
    # date published
    pub_date = models.DateTimeField()
    # when queried, show its id and it's title
    def __str__(self):
        return (str(self.id) + " " + str(self.title))


class Comment(models.Model):
    # foreign key
    blog_fk = models.ForeignKey(Blog, related_name='comments' ,on_delete=models.CASCADE)
    # title of comment
    title   = models.CharField(max_length=100)
    # author of comment
    author  = models.CharField(max_length=32)
    # date commented
    pub_date = models.DateTimeField()
    # the meat of the post
    content = models.CharField(max_length=1024)
    # when queried, show the fk to the Blog and the title of the comment
    def __str__(self):
        return (str(self.blog_fk) + " " + self.title)
    