from rest_framework import viewsets
from .filters import ActorFilter
from .models import Actor
from .serializers import ActorDetailSerializer, ActorListSerializer

class ActorViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Actor operations"""
    filterset_class = ActorFilter
    pagination_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ActorDetailSerializer
        return ActorListSerializer

    def get_queryset(self):
        return Actor.objects.prefetch_related('movies', 'movies__genres', 'movies__director')
