import { Component, OnInit } from '@angular/core';
//Rutas
import { ActivatedRoute } from '@angular/router';
// Servicios
import { PeliculasService } from '../../services/peliculas.service';
// Modelo de Datos
import { Movie } from '../../interfaces/cartelera';

@Component({
  selector: 'BuscarComponent',
  templateUrl: './buscar.component.html',
  styleUrls: [],
})
export class BuscarComponent implements OnInit {
  public texto: string = '';
  public peliculas: Movie[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.texto = params.texto;
      this.peliculasService.buscarPeliculas(params.texto).subscribe(peliculas => {
        this.peliculas = peliculas;
      });
    });
  }
}
