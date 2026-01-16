from rest_framework import viewsets
from .models import Director
from .serializers import DirectorDetailSerializer, DirectorListSerializer
from .filters import DirectorFilter

class DirectorViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Director operations"""
    filterset_class = DirectorFilter
    pagination_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DirectorDetailSerializer
        return DirectorListSerializer

    def get_queryset(self):
        return Director.objects.prefetch_related('movies', 'movies__genres', 'movies__cast')

