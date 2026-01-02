import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'PeliculaComponent',
  templateUrl: './pelicula.component.html',
  styleUrls: [],
})
export class PeliculaComponent implements OnInit {
  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  onRegresar() {
    this.location.back();
  }
}
