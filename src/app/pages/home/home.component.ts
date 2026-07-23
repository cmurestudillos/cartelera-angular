import { ChangeDetectionStrategy, Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
// Servicios
import { PeliculasService } from '../../services/peliculas.service';
// Modelo de Datos
import { Movie } from '../../interfaces/cartelera';
// Componentes
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from '../../components/peliculas-poster-grid/peliculas-poster-grid.component';

/**
 * Pagina de inicio: cartelera en cines con scroll infinito y slideshow destacado.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SlideshowComponent, PeliculasPosterGridComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  public peliculas: Movie[] = [];
  public peliculasSlideshow: Movie[] = [];

  @HostListener('window:scroll')
  public onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (pos > max) {
      if (this.peliculasService.cargando) {
        return;
      }
      this.peliculasService.getCartelera().subscribe(peliculas => {
        this.peliculas.push(...peliculas);
      });
    }
  }

  public ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe(peliculas => {
      // console.log(resp.results);
      this.peliculas = peliculas;
      this.peliculasSlideshow = peliculas;
    });
  }

  public ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }

  private peliculasService = inject(PeliculasService);
}
