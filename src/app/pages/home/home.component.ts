import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
// Servicios
import { PeliculasService } from '../../services/peliculas.service';
// Modelo de Datos
import { Movie } from '../../interfaces/cartelera';

@Component({
  selector: 'HomeComponent',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public peliculas: Movie[] = [];
  public peliculasSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
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

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe(peliculas => {
      // console.log(resp.results);
      this.peliculas = peliculas;
      this.peliculasSlideshow = peliculas;
    });
  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }
}
