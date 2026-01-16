from django_filters import rest_framework as filters
from .models import Movie
from actors.models import Actor
from directors.models import Director
from genres.models import Genre

class MovieFilter(filters.FilterSet):
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    release_year = filters.NumberFilter()
    release_year_min = filters.NumberFilter(field_name='release_year', lookup_expr='gte')
    release_year_max = filters.NumberFilter(field_name='release_year', lookup_expr='lte')
    genres = filters.ModelMultipleChoiceFilter(
        queryset=Genre.objects.all(),
        field_name='genres'
    )
    director = filters.ModelChoiceFilter(queryset=Director.objects.all())
    cast = filters.ModelMultipleChoiceFilter(
        queryset=Actor.objects.all(),
        field_name='cast'
    )
    rating_min = filters.NumberFilter(field_name='rating', lookup_expr='gte')
    rating_max = filters.NumberFilter(field_name='rating', lookup_expr='lte')

    class Meta:
        model = Movie
        fields = ['title', 'release_year', 'genres', 'director', 'cast', 'rating_min', 'rating_max']
