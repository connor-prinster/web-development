from django.db import models

class UnitConversion(models.Model):
    #title
    convTitle = models.CharField(max_length=1024)
    #conversion factor
    convFactor = models.FloatField()

    def __str__(self):
        return("convTitle = " + str(self.convTitle) + " convFactor = " + str(self.convFactor))