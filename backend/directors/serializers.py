from rest_framework import serializers
from .models import Director

class DirectorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = ('id', 'first_name', 'last_name', 'full_name', 'image_url')

class DirectorDetailSerializer(serializers.ModelSerializer):
    """Detailed director information with movies"""
    movies = serializers.SerializerMethodField()
    
    class Meta:
        model = Director
        fields = (
            'id', 'first_name', 'last_name', 'full_name', 'bio',
            'birth_date', 'nationality', 'image_url', 'movies', 'created_at'
        )
    
    def get_movies(self, obj):
        # Local import breaks the circular dependency
        from movies.serializers import MovieListSerializer
        return MovieListSerializer(obj.movies.all(), many=True).data
