from django.db import models
from django.contrib.auth.models import AbstractUser

def def_factories():
    return [
        {
            "inputs": [],
            "output": "",
            "input_code": "",
            "workers": 0,
            "id": 0
        },
        {
            "inputs": [],
            "output": "",
            "input_code": "",
            "workers": 0,
            "id": 0
        },
        {
            "inputs": [],
            "output": "",
            "input_code": "",
            "workers": 0,
            "id": 0
        },
        {
            "inputs": [],
            "output": "",
            "input_code": "",
            "workers": 0,
            "id": 0
        }
    ]

def def_jobs():
    return {
        "nitwit": 0,
        "miner": 0,
        "hunter": 0,
        "forager": 0,
        "lumberjack": 0,
        "factory_worker": 0
    }

def def_resource():
    return {
        "meat": 0,
        "hide": 0,
        "wool": 0,
        "berries": 0,
        "comphrey": 0,
        "wood": 0,
        "stone": 0,
        "ore": 0,
        "steak": 0,
        "leather": 0,
        "piety": 0,
        "bed": 0,
        "iron": 0,
        "gold": 0,
        "shield": 0,
    }

class User(AbstractUser):
    def __str__(self):
        return self.username

class Game(models.Model):
    player = models.ForeignKey('User', on_delete=models.CASCADE)
    factories = models.JSONField(default=def_factories)
    jobs = models.JSONField(default=def_jobs)
    resource = models.JSONField(default=def_resource)
    ascention = models.IntegerField(default=0)
    food_intake = models.FloatField(default=0.0)
    def delete(self, *args, **kwargs):
        super(Game, self).delete(*args, **kwargs)
        new_game = Game.objects.create(player=self.player)
        self.player.game = new_game
        self.player.save()
