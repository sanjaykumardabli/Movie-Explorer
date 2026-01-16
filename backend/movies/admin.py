from django.contrib import admin
from .models import Movie, MovieCast, MovieGenre

admin.site.register(Movie)
admin.site.register(MovieCast)
admin.site.register(MovieGenre)
