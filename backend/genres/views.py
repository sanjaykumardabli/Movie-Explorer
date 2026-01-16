from rest_framework import viewsets
from .models import Genre
from .serializers import GenreSerializer

class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Genre operations"""
    pagination_class = None

    def get_serializer_class(self):
        return GenreSerializer

    def get_queryset(self):
        return Genre.objects.prefetch_related('movies')
