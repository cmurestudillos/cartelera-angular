import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
//Rutas
import { ActivatedRoute } from '@angular/router';
// Servicios
import { PeliculasService } from '../../services/peliculas.service';
// Modelo de Datos
import { Movie } from '../../interfaces/cartelera';
// Componentes
import { PeliculasPosterGridComponent } from '../../components/peliculas-poster-grid/peliculas-poster-grid.component';

/**
 * Pagina de resultados de busqueda de peliculas por texto (parametro de ruta).
 */
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [PeliculasPosterGridComponent],
})
export class BuscarComponent implements OnInit {
  public texto = '';
  public peliculas: Movie[] = [];

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.texto = params.texto;
      this.peliculasService.buscarPeliculas(params.texto).subscribe(peliculas => {
        this.peliculas = peliculas;
      });
    });
  }

  private activatedRoute = inject(ActivatedRoute);
  private peliculasService = inject(PeliculasService);
}
