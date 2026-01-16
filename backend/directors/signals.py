from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction
from django.core.cache import cache
from .models import Director

@receiver(post_save, sender=Director)
def clear_director_cache(sender, instance, **kwargs):
    def delete_cache():
        cache.delete(f'director_{instance.id}')
    
    # Ensures the signal logic waits for the DB commit
    transaction.on_commit(delete_cache)
