from django_filters import rest_framework as filters
from .models import Actor
from genres.models import Genre
from movies.models import Movie

class ActorFilter(filters.FilterSet):
    name = filters.CharFilter(field_name='last_name', lookup_expr='icontains')
    movies = filters.ModelMultipleChoiceFilter(
        queryset=Movie.objects.all(),
        field_name='movies'
    )
    genres = filters.ModelMultipleChoiceFilter(
        queryset=Genre.objects.all(),
        field_name='movies__genres'
    )

    class Meta:
        model = Actor
        fields = ['name', 'movies', 'genres']