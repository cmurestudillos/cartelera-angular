import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
// rutas
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// Servicios
import { PeliculasService } from '../../services/peliculas.service';
// Modelado de datos
import { MovieResponse } from '../../interfaces/movie';
import { Cast } from '../../interfaces/credits';
// Operadores
import { combineLatest } from 'rxjs';
// Componentes y pipes
import { CastSlideshowComponent } from '../../components/cast-slideshow/cast-slideshow.component';
import { PosterPipe } from '../../pipes/poster.pipe';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';

/**
 * Pagina de detalle de una pelicula: sinopsis, puntuacion y reparto.
 */
@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DecimalPipe, PosterPipe, StarRatingComponent, CastSlideshowComponent],
})
export class PeliculaComponent implements OnInit {
  public pelicula!: MovieResponse;
  public cast: Cast[] = [];

  public ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    combineLatest([this.peliculasService.getPeliculaDetalle(id), this.peliculasService.getCast(id)]).subscribe(
      ([pelicula, cast]) => {
        if (!pelicula) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.pelicula = pelicula;
        this.cast = cast.filter(actor => actor.profile_path !== null);
      }
    );
  }

  public onRegresar(): void {
    this.location.back();
  }

  private activatedRoute = inject(ActivatedRoute);
  private peliculasService = inject(PeliculasService);
  private location = inject(Location);
  private router = inject(Router);
}
