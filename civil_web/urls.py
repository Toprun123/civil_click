from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('login', views.login_view, name="login"),
    path('register', views.register_view, name="register"),
    path('logout', views.logout_view, name="logout"),
    path('game', views.game, name="game"),
    path('get-api', views.get_api, name="get-api"),
    path('del-api', views.del_api, name="del-api"),
    path('save-api', views.save_api, name="save-api"),
]
