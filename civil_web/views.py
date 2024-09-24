import re
import json
from .models import *
from django import forms
from django.urls import reverse
from django.shortcuts import render
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout

# Create your views here.

class RegisterForm(forms.Form):
    template_name = 'civil/form_snippet.html'
    username = forms.CharField(
        widget = forms.TextInput(
            attrs = {
                'class': 'form-input'
            }
        )
    )
    email = forms.EmailField(
        widget = forms.EmailInput(
            attrs = {
                'class': 'form-input'
            }
        )
    )
    password = forms.CharField(
        widget = forms.PasswordInput(
            attrs = {
                'class': 'form-input'
            }
        )
    )
    password_confirm = forms.CharField(
        widget = forms.PasswordInput(
            attrs = {
                'class': 'form-input'
            }
        )
    )

class LoginForm(forms.Form):
    template_name = 'civil/form_snippet.html'
    username = forms.CharField(
        widget = forms.TextInput(
            attrs = {
                'class': 'form-input'
            }
        )
    )
    password = forms.CharField(
        widget = forms.PasswordInput(
            attrs = {
                'class': 'form-input'
            }
        )
    )

def index(request):
    return render(request, 'civil/index.html', {
        "games": ["hello", "world"]
    })

@login_required(login_url='/login')
def logout(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def login(request):
    login_form = LoginForm()
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        else:
            return render(request, "civil/login.html", {
                "message": "Invalid username and/or password.",
                "login_form": login_form
            })
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "civil/login.html", {
            "login_form": login_form
        })

def register(request):
    register_form = RegisterForm()
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["password_confirm"]
        if password != confirmation:
            return render(request, "civil/register.html", {
                "message": "Passwords must match.",
                "register_form": register_form
            })
        if not re.match('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$', password):
            return render(request, "civil/register.html", {
                "message": "Password must contain at least eight characters, at least one number and one letter.",
                "register_form": register_form
            })
        try:
           user = User.objects.create_user(username, email, password)
           user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "civil/register.html", {
                "message": "Username address already taken.",
                "register_form": register_form
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "civil/register.html", {
            "register_form": register_form
        })

@login_required(login_url='/login')
def game(request):
    return render(request, "civil/game.html")

@csrf_exempt
@require_POST
@login_required(login_url='/login')
def save_api(request):
    body = json.loads(request.body)
    game = Game.objects.get(player=request.user)
    game.factories = body["factories"]
    game.jobs = body["jobs"]
    game.resource = body["resource"]
    game.ascention = body["ascention"]
    game.food_intake = body["food_intake"]
    game.save()
    return JsonResponse({})

@csrf_exempt
@require_POST
@login_required(login_url='/login')
def get_api(request):
    game, _created = Game.objects.get_or_create(player=request.user)
    response_data = {
        "factories": game.factories,
        "jobs": game.jobs,
        "resource": game.resource,
        "ascention": game.ascention,
        "food_intake": game.food_intake
    }
    return JsonResponse(response_data)

@csrf_exempt
@require_POST
@login_required(login_url='/login')
def del_api(request):
    game = Game.objects.get(player=request.user)
    game.delete()
    return JsonResponse({})
