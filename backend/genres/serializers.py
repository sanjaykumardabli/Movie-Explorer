from rest_framework import serializers
from .models import Genre

class GenreSerializer(serializers.ModelSerializer):
    movies_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Genre
        fields = ('id', 'name', 'description', 'movies_count')
    
    def get_movies_count(self, obj):
        return obj.movies.count()
