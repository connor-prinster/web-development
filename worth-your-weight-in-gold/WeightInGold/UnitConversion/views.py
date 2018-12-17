from django.shortcuts import render, reverse, redirect

from django.http import JsonResponse, HttpResponse, HttpResponseRedirect

from .models import UnitConversion

def conversions(request):
    requestVal = request.GET.items()
    requestList = list(requestVal)

    result = {}
    if len(requestList) != 3:
        result['error'] = 'Invalid unit conversion request'
    else:
        conversionTitle = str(requestList[0][1]) + str(requestList[1][1])
 
        queried = UnitConversion.objects.get(convTitle=conversionTitle)
        result = {"units": requestList[0][1], "value": str(queried.convFactor)}

    response = JsonResponse(result)
    response['Access-Control-Allow-Origin'] = '*'
    return response

def index(request):
    return render(request, 'WebForm/index.html')

def init(request):
    for b in UnitConversion.objects.all():
        b.delete()

    lbsToToz = UnitConversion(convTitle="lbst_oz", convFactor=14.5833)
    lbsToToz.save()

    tozToLbs = UnitConversion(convTitle="t_ozlbs", convFactor=0.0685714)
    tozToLbs.save()

    return HttpResponse('Cannot redirect to a page in another app.\n Go to http://127.0.0.1:8000/webform/ to continue')

