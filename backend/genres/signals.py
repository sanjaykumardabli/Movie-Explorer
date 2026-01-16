from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction
from django.core.cache import cache
from .models import Genre

@receiver(post_save, sender=Genre)
def clear_genre_cache(sender, instance, **kwargs):
    def delete_cache():
        cache.delete(f'genre_{instance.id}')
        cache.delete('all_genres')
    
    # Ensures the signal logic waits for the DB commit
    transaction.on_commit(delete_cache)
