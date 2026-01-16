from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    description = models.TextField()
    release_year = models.IntegerField(db_index=True)
    release_date = models.DateField()
    duration_minutes = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    budget = models.BigIntegerField(null=True, blank=True)
    box_office = models.BigIntegerField(null=True, blank=True)
    poster_url = models.URLField(blank=True)
    
    director = models.ForeignKey(
        'directors.Director',
        on_delete=models.SET_NULL,
        null=True,
        related_name='movies'
    )
    
    genres = models.ManyToManyField(
        'genres.Genre',
        related_name='movies',
        through='MovieGenre'
    )
    
    cast = models.ManyToManyField(
        'actors.Actor',
        related_name='movies',
        through='MovieCast'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'movies'
        ordering = ['-release_date']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['release_year']),
            models.Index(fields=['-release_date']),
            models.Index(fields=['director']),
        ]

    def __str__(self):
        return self.title

class MovieGenre(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    genre = models.ForeignKey('genres.Genre', on_delete=models.CASCADE)

    class Meta:
        db_table = 'movie_genres'
        unique_together = ('movie', 'genre')

class MovieCast(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    actor = models.ForeignKey('actors.Actor', on_delete=models.CASCADE)
    character_name = models.CharField(max_length=255, blank=True)
    cast_order = models.IntegerField(default=0)

    class Meta:
        db_table = 'movie_cast'
        unique_together = ('movie', 'actor')
        ordering = ['cast_order']
