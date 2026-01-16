from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from movies.views import MovieViewSet
from actors.views import ActorViewSet
from directors.views import DirectorViewSet
from genres.views import GenreViewSet
from django.http import JsonResponse

router = DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'actors', ActorViewSet, basename='actor')
router.register(r'directors', DirectorViewSet, basename='director')
router.register(r'genres', GenreViewSet, basename='genre')

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('health/', lambda request: JsonResponse({'status': 'healthy'})),
]
