from rest_framework import serializers
from .models import Movie, MovieCast
from actors.serializers import ActorListSerializer
from directors.serializers import DirectorListSerializer
from genres.serializers import GenreSerializer

class MovieCastSerializer(serializers.ModelSerializer):
    actor = ActorListSerializer(read_only=True)
    
    class Meta:
        model = MovieCast
        fields = ('id', 'actor', 'character_name', 'cast_order')

class MovieListSerializer(serializers.ModelSerializer):
    director_name = serializers.CharField(source='director.full_name', read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = ('id', 'title', 'release_year', 'rating', 'poster_url', 'director_name', 'genres')

class MovieDetailSerializer(serializers.ModelSerializer):
    director = DirectorListSerializer(read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    cast = MovieCastSerializer(source='moviecast_set', many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = (
            'id', 'title', 'description', 'release_year', 'release_date',
            'duration_minutes', 'rating', 'budget', 'box_office',
            'poster_url', 'director', 'genres', 'cast', 'created_at', 'updated_at'
        )
