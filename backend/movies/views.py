from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.cache import cache
from django.db.models import Q, Prefetch
from .models import Movie
from .serializers import MovieListSerializer, MovieDetailSerializer
from .filters import MovieFilter
import logging

logger = logging.getLogger(__name__)

class MovieViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Movie operations with caching and advanced filtering.
    
    List - Get all movies with optional filters
    Retrieve - Get single movie details
    """
    filterset_class = MovieFilter
    pagination_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return MovieDetailSerializer
        return MovieListSerializer

    def get_queryset(self):
        base_qs = Movie.objects.select_related('director').prefetch_related(
            'genres',
            Prefetch('moviecast_set'),
            Prefetch('cast')
        )
        return base_qs.distinct()

    def list(self, request, *args, **kwargs):
        """
        List movies with caching.
        
        Query Parameters:
        - title: Search by title
        - release_year: Exact year
        - release: Year range
        - genres: Comma-separated genre IDs
        - director: Director ID
        - cast: Comma-separated actor IDs
        - rating: Rating range
        """
        try:
            cache_key = f"movies_list_{request.query_params.urlencode()}"
            cached_data = cache.get(cache_key)
            
            if cached_data:
                return Response(cached_data)
            
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            
            response_data = {
                'count': queryset.count(),
                'results': serializer.data
            }
            
            cache.set(cache_key, response_data, 3600)
            return Response(response_data)
        except Exception as e:
            logger.error(f"Error listing movies: {str(e)}")
            return Response({'error': 'Failed to fetch movies'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, *args, **kwargs):
        """Get detailed movie information with cast and crew"""
        try:
            movie_id = self.kwargs.get('pk')
            cache_key = f'movie_detail_{movie_id}'
            
            cached_data = cache.get(cache_key)
            if cached_data:
                return Response(cached_data)
            
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            
            cache.set(cache_key, serializer.data, 3600)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error retrieving movie {movie_id}: {str(e)}")
            return Response({'error': 'Movie not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Full-text search across movies.
        
        Query Parameters:
        - q: Search query
        """
        query = request.query_params.get('q', '').strip()
        if not query or len(query) < 2:
            return Response({'error': 'Query must be at least 2 characters'}, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.get_queryset().filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(director__first_name__icontains=query) |
            Q(director__last_name__icontains=query)
        )[:20]
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({'count': len(serializer.data), 'results': serializer.data})

    @action(detail=False, methods=['get'])
    def trending(self, request):
        """Get trending movies by rating"""
        queryset = self.get_queryset().order_by('-rating')[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recently released movies"""
        queryset = self.get_queryset().order_by('-release_date')[:10]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
