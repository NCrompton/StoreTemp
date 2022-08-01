from django.shortcuts import render
from django.urls import reverse
from django.views import View
from django.http import HttpResponse, HttpResponseRedirect
from allauth.socialaccount import providers 
from django.contrib.auth.decorators import login_required 
from django.utils.decorators import method_decorator
from .models import Course
from .api import Api
import json
import requests
from .auth_helper import get_sign_in_flow, get_token_from_code, store_user, remove_user_and_token, get_token
from .graph_helper import *


response = HttpResponse()

def index(request):
    a = ['gpp']
    b = Course.objects.using('cas').all()
    c = Course.objects.all()
    return render(request, 'index.html', {"course" : a,
                                            "coures": b,
                                            "bro": c,})          

def api(request, *args, **kwargs):
    return HttpResponse(json.dumps(api), content_type="application/json")

@method_decorator(login_required, name="dispatch")
class ApiView(View):
    def get(self, request, *args, **kwargs):
        a = []
        print(request.user)
        for course in Course.objects.all():
            dict1 = {'id': course.course_id, 'code': course.code, 'dept': course.dept, 'website': course.website, 'subject_area': course.subject_area}
            a.append(dict1)
        api = Api(a).generateAPI()
        return HttpResponse(json.dumps(api), content_type="application/json")

def initialize_context(request):
    context = {}
    error = request.session.pop('flash_error', None)
    if error != None:
      context['errors'] = []
    context['errors'].append(error)
    # Check for user in the session
    context['user'] = request.session.get('user',{'is_authenticated': False})
    return context

def sign_in(request):
    # Get the sign-in flow
    flow = get_sign_in_flow()
    # Save the expected flow so we can use it in the callback
    try:
        request.session['auth_flow'] = flow
    except Exception as e:
        print(e)
    # Redirect to the Azure sign-in page
    return HttpResponseRedirect(flow['auth_uri'])

def sign_out(request):
    # Clear out the user and token
    remove_user_and_token(request)
    return HttpResponseRedirect(reverse('home'))

def callback(request):
    # Make the token request
    result = get_token_from_code(request)
    #Get the user's profile from graph_helper.py script
    user = get_user(result['access_token']) 
    # Store user from auth_helper.py script
    store_user(request, user)
    return HttpResponseRedirect(reverse('home'))