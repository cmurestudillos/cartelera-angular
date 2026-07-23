import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convierte un `poster_path`/`profile_path` de TMDB en una URL absoluta de imagen,
 * o devuelve un placeholder local cuando no hay imagen disponible.
 */
@Pipe({ name: 'poster' })
export class PosterPipe implements PipeTransform {
  public transform(poster: string | null): string {
    if (poster) {
      return `https://image.tmdb.org/t/p/w500${poster}`;
    } else {
      return './assets/no-image.jpg';
    }
  }
}
