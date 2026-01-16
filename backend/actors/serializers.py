from rest_framework import serializers
from .models import Actor

class ActorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('id', 'first_name', 'last_name', 'full_name', 'image_url', 'rating')

class ActorDetailSerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()
    
    class Meta:
        model = Actor
        fields = (
            'id', 'first_name', 'last_name', 'full_name', 'bio',
            'birth_date', 'nationality', 'image_url', 'rating', 'movies', 'created_at'
        )
    
    def get_movies(self, obj):
        # Local import breaks the circular dependency
        from movies.serializers import MovieListSerializer
        return MovieListSerializer(obj.movies.all(), many=True).data
