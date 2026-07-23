import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/cartelera';
import { PosterPipe } from '../../pipes/poster.pipe';
import { StarRatingComponent } from '../star-rating/star-rating.component';

/**
 * Cuadricula de posters de peliculas con puntuacion; navega al detalle al hacer click/Enter.
 */
@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DecimalPipe, PosterPipe, StarRatingComponent],
})
export class PeliculasPosterGridComponent {
  @Input() public peliculas: Movie[] = [];

  public onMovieClick(movie: Movie): void {
    this.router.navigate(['/pelicula', movie.id]);
  }

  private router = inject(Router);
}
