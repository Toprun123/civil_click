from django.shortcuts import render
import json
import re
from .models import *
from django import forms
from django.urls import reverse
from django.db import IntegrityError
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
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
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def login_view(request):
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

def register_view(request):
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

def test(request):
    return render(request, "civil/test.html")

